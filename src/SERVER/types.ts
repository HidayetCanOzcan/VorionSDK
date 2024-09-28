import { PredictionResponse } from '../LLM/globalTypes';
import { IngestResponse } from '../RAG/globalTypes';

export enum Events {
	SEND_MESSAGE_HISTORY = 'send-message-history',
	SEND_CONVERSATIONS = 'send-conversations',
	ANSWER_ME = 'answer-me',
	DELETE_CONVERSATION = 'delete-conversation',
	UPDATE_CONVERSATION = 'update-conversation',
	CACHE_CONVERSATIONS = 'cache-conversations',
	REPORT = 'report',
	LOAD_MESSAGES = 'load-messages',
	LOAD_ANSWER = 'load-answer',
	ACK = 'acknowledge',
}

export enum DaprEvents {
	PREDICTION_COMPLETE = 'prediction-completed',
	PREDICTION_FAILED = 'prediction-failed',
	INGEST_DOCUMENTS_LOADED = 'ingest-documents-loaded',
	INGEST_DOCUMENTS_LOADED_ERROR = 'ingest-documents-loaded-error',
	INGEST_DOCUMENTS_SPLITTED = 'ingest-documents-splitted',
	INGEST_DOCUMENTS_SPLITTED_ERROR = 'ingest-documents-splitted-error',
	INGEST_DOCUMENTS_EMBEDDED_AND_STORED = 'ingest-documents-embedded-and-stored',
	INGEST_DOCUMENTS_EMBEDDED_AND_STORED_ERROR = 'ingest-documents-embedded-and-stored-error',
	INGEST_DOCUMENTS_INDEXED_AND_STORED = 'ingest-documents-indexed-and-stored',
	INGEST_DOCUMENTS_INDEXED_AND_STORED_ERROR = 'ingest-documents-indexed-and-stored-error',
	INGEST_DOCUMENTS_FAILED = 'ingest-documents-failed',
	INGEST_DOCUMENTS_SUCCEEDED = 'ingest-documents-succeeded',
	INGEST_DOCUMENTS_SUCCEEDED_WITH_PARTIAL_ERROR = 'ingest-documents-succeeded-with-partial-error',
	AGENT_TASK_COMPLETED = 'agent-task-completed',
	AGENT_TASK_FAILED = 'agent-task-failed',
}

export type EventDataTypesMap = {
	[DaprEvents.PREDICTION_COMPLETE]: PredictionResponse;
	[DaprEvents.INGEST_DOCUMENTS_SUCCEEDED]: IngestResponse;
	[DaprEvents.PREDICTION_FAILED]: unknown;
	[DaprEvents.INGEST_DOCUMENTS_LOADED]: IngestResponse;
	[DaprEvents.INGEST_DOCUMENTS_LOADED_ERROR]: unknown;
	[DaprEvents.INGEST_DOCUMENTS_SPLITTED]: IngestResponse;
	[DaprEvents.INGEST_DOCUMENTS_SPLITTED_ERROR]: unknown;
	[DaprEvents.INGEST_DOCUMENTS_EMBEDDED_AND_STORED]: IngestResponse;
	[DaprEvents.INGEST_DOCUMENTS_EMBEDDED_AND_STORED_ERROR]: unknown;
	[DaprEvents.INGEST_DOCUMENTS_INDEXED_AND_STORED]: IngestResponse;
	[DaprEvents.INGEST_DOCUMENTS_INDEXED_AND_STORED_ERROR]: unknown;
	[DaprEvents.INGEST_DOCUMENTS_FAILED]: unknown;
	[DaprEvents.INGEST_DOCUMENTS_SUCCEEDED_WITH_PARTIAL_ERROR]: unknown;
	[DaprEvents.AGENT_TASK_COMPLETED]: unknown;
	[DaprEvents.AGENT_TASK_FAILED]: unknown;
};

export type WsMessage<T> = {
	event: Events;
	payload?: T;
	role?: 'system' | 'assistant' | 'user' | 'human' | 'ai';
	ackId: number;
};

export type ReportPayload = {
	message: string;
	scope: string;
};

export type Sessions = {
	[sessionId: string]: Set<any>;
};
export type WaitingQueue = {
	[sessionId: string]: WsMessage<unknown>[];
};
type KnownDaprEvents = keyof EventDataTypesMap;
export type wsServerResponseFunction<T extends KnownDaprEvents> = (data: EventDataTypesMap[T]) =>
	| Promise<{
			event?: string;
			payload: any;
			role?: 'system' | 'assistant' | 'user' | 'human' | 'ai';
	  }>
	| {
			event?: string;
			payload: any;
			role?: 'system' | 'assistant' | 'user' | 'human' | 'ai';
	  }
	| void;

export type wsServerResponses = Partial<{
	[K in KnownDaprEvents]: wsServerResponseFunction<K>;
}>;

export type VorionServerParams = {
	port: number;
	wsServerResponses?: wsServerResponses;
	listenCallback?: () => void;
};
