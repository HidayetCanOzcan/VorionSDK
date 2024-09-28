import { v4 as uuidv4 } from 'uuid';

class WebSocketManager {
	private static instance: WebSocketManager;
	private sockets: Map<string, WebSocket> = new Map();

	private constructor() {}

	public static getInstance(): WebSocketManager {
		if (!WebSocketManager.instance) {
			WebSocketManager.instance = new WebSocketManager();
		}
		return WebSocketManager.instance;
	}

	public async getSocket(userId: string): Promise<WebSocket> {
		if (!this.sockets.has(userId)) {
			const socket = await new Promise<WebSocket>((resolve, reject) => {
				const ws = new WebSocket(`${process.env.SOCKET_HOST}/ws?session=${userId}.s`);
				ws.onopen = () => resolve(ws);
				ws.onerror = (error) => reject(error);
			});
			this.sockets.set(userId, socket);
		}
		return this.sockets.get(userId)!;
	}

	public async sendMessage(userId: string, event: string, payload: any, role: string = 'system'): Promise<void> {
		if (!userId || !event) {
			console.log(`⚠️ Invalid sendMessage parameters: userId=${userId}, event=${event}`);
			return;
		}
		const socket = await this.getSocket(userId);
		socket.send(
			JSON.stringify({
				event,
				payload,
				role,
				ackId: uuidv4(),
			})
		);
	}

	public closeSocket(userId: string): void {
		const socket = this.sockets.get(userId);
		if (socket) {
			socket.close();
			this.sockets.delete(userId);
		}
	}
}

export const wsManager = WebSocketManager.getInstance();
