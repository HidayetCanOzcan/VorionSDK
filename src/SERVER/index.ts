import { cors } from '@elysiajs/cors';
import {
	DaprEvents,
	EventDataTypesMap,
	Events,
	Sessions,
	VorionServerParams,
	WaitingQueue,
	WsMessage,
	wsServerResponseFunction,
} from './types';
import Elysia from 'elysia';
import { AuthenticationError, AuthorizationError, InternalServerError, InvariantError, NotFoundError } from './exceptions';
import { wsManager } from './WebSocketManager';
import { PredictionResponse } from '../LLM/globalTypes';
import { IngestResponse } from '../RAG/globalTypes';

function findUserId(obj: any): string | undefined {
	if (typeof obj !== 'object' || obj === null) {
		return undefined;
	}

	if (typeof obj.user_id === 'string') return obj.user_id;
	if (typeof obj.userId === 'string') return obj.userId;

	for (const key in obj) {
		if (typeof obj[key] === 'object') {
			const result = findUserId(obj[key]);
			if (result) return result;
		}
	}

	return undefined;
}

export const createVorionServer = ({ port, listenCallback, wsServerResponses }: VorionServerParams) => {
	const appSettings = new Elysia()
		.error('AUTHENTICATION_ERROR', AuthenticationError)
		.error('AUTHORIZATION_ERROR', AuthorizationError)
		.error('INVARIANT_ERROR', InvariantError)
		.error('INTERNAL_SERVER_ERROR', InternalServerError)
		.error('NOT_FOUND', NotFoundError)
		.onError(({ code, error, set }) => {
			switch (code) {
				case 'AUTHENTICATION_ERROR':
					set.status = 401;
					return {
						status: 'error',
						message: error.toString().replace('Error: ', ''),
					};
				case 'AUTHORIZATION_ERROR':
					set.status = 403;
					return {
						status: 'error',
						message: error.toString().replace('Error: ', ''),
					};
				case 'INVARIANT_ERROR':
					set.status = 400;
					return {
						status: 'error',
						message: error.toString().replace('Error: ', ''),
					};
				case 'NOT_FOUND':
					set.status = 404;
					return {
						status: 'error',
						message: error.toString().replace('Error: ', ''),
					};
				case 'INTERNAL_SERVER_ERROR':
					set.status = 500;
					return {
						status: 'error',
						message: error.toString().replace('Error: ', ''),
					};
			}
		})
		.use(cors())
		.state({
			chatSessions: {} as Sessions,
			waitingQueue: {} as WaitingQueue,
		});

	const app = appSettings
		.ws('/ws', {
			open(ws) {
				const sessionId = ws.data.query.session;
				if (typeof sessionId === 'undefined') {
					console.error('Session ID tanımlı değil.');
					return;
				}
				const { chatSessions, waitingQueue } = ws.data.store;
				if (!chatSessions[sessionId]) chatSessions[sessionId] = new Set();
				else if (!(chatSessions[sessionId] instanceof Set)) {
					console.error('chatSessions[' + sessionId + '] bir Set değil, yeniden başlatılıyor.');
					chatSessions[sessionId] = new Set();
				}
				chatSessions[sessionId].add(ws);

				if (waitingQueue[sessionId]) {
					waitingQueue[sessionId].forEach((message: WsMessage<unknown>) => {
						chatSessions[sessionId].forEach((client) => {
							client.send(message);
						});
					});
				}
			},
			close(ws) {
				const sessionId = ws.data.query.session;
				if (typeof sessionId === 'undefined') {
					console.error('Session ID tanımlı değil.');
					return;
				}

				const { chatSessions } = ws.data.store;
				if (chatSessions[sessionId] && chatSessions[sessionId] instanceof Set) {
					chatSessions[sessionId].delete(ws);
					if (chatSessions[sessionId].size === 0) delete chatSessions[sessionId];
				} else {
					console.error('chatSessions[' + sessionId + '] bir Set değil.');
				}
			},
			async message(ws, message) {
				const sessionId = ws.data.query.session;
				console.log('📑📬', sessionId, message);
				if (typeof sessionId === 'undefined') {
					console.error('Session ID tanımlı değil.');
					return;
				}

				const { chatSessions, waitingQueue } = ws.data.store;
				let parsedMessage: WsMessage<unknown>;
				if (typeof message === 'string') {
					try {
						parsedMessage = JSON.parse(message);
					} catch (e) {
						console.error('Mesaj JSON olarak ayrıştırılamadı:', e);
						return;
					}
				} else {
					parsedMessage = message as WsMessage<unknown>;
				}
				if (parsedMessage.event === Events.ACK && sessionId.split('.')[1] === 'c' && waitingQueue[sessionId]) {
					const filtered = waitingQueue[sessionId].filter((q) => q.ackId !== parsedMessage.ackId);
					waitingQueue[sessionId] = filtered;
				} else {
					const sessionPartials = sessionId.split('.');
					const redirectedSessionId = `${sessionPartials[0]}.${sessionPartials[1] === 'c' ? 's' : 'c'}`;

					if (chatSessions[redirectedSessionId]) {
						chatSessions[redirectedSessionId].forEach((client) => {
							if (client !== ws) {
								client.send(parsedMessage);
							}
						});

						if (!waitingQueue[redirectedSessionId] && redirectedSessionId.split('.')[1] === 'c') {
							waitingQueue[redirectedSessionId] = [];
						}
						if (redirectedSessionId.split('.')[1] === 'c') waitingQueue[redirectedSessionId].push(parsedMessage);
					}
				}
			},
		})
		.group('/subs', (app) => {
			(Object.keys(DaprEvents) as Array<keyof typeof DaprEvents>).forEach((event) => {
				const eventName = DaprEvents[event];
				app.post(`/${eventName}`, async ({ request, set }) => {
					try {
						console.log(`📑 Triggered Event: ${eventName}`);
						const { data } = (await request.json()) as { data: EventDataTypesMap[typeof eventName] };
						console.log(`🚩🚩🚩`, data);

						if (wsServerResponses && wsServerResponses[eventName]) {
							const userId = findUserId(data);
							console.log(`🙋‍♂️🙋‍♀️ Found userId for ${eventName}:`, userId);

							if (!userId) {
								console.log(
									`⚠️ Error, user id not found! User id is required for socket communications - ${eventName} \n 🚩🚩🚩 ${JSON.stringify(
										data
									)}`
								);
								throw new InternalServerError(`⚠️ Error, user id not found! User id is required for socket communications - ${eventName}`);
							}

							const responseFunction = wsServerResponses[eventName] as wsServerResponseFunction<typeof eventName>;
							const response = await Promise.resolve(responseFunction(data));

							if (response && userId) {
								await wsManager.sendMessage(userId, response.event || eventName, response.payload, response.role);
							} else {
								console.log(`⚠️ Invalid response for event ${eventName}:`, response);
							}
						}

						set.status = 200;
						return 'ACK';
					} catch (error) {
						console.error('⚠️📬 Error:', error instanceof Error ? error.message : String(error));
						set.status = 500;
						return 'ERR';
					}
				});
			});

			return app;
		});

	const start = () => {
		app.listen({ port, hostname: '0.0.0.0' }, () => {
			if (listenCallback) listenCallback();
		});
		console.log(`🆗 Vorion Server is running on port ${port}`);
	};

	return {
		start,
		app,
		appSettings,
	};
};
