export enum VorionEvents {
	PREDICTION_COMPLETE = 'prediction-complete',
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
	AGENT_TASK_COMPLETED = 'basic-agent-task-completed',
	AGENT_TASK_FAILED = 'basic-agent-task-failed',
}

export type VorionEventHandlers = {
	[K in VorionEvents]: (payload: any) => void;
};
