import { IngestRequest, IngestResponse } from '../ingest/types';

export type QueryIngestStateRequest = {
	task_id: string;
};

export type IngestDocumentsEventModel = {
	ingest_response_model: IngestResponse;
	ingest_request_model: IngestRequest;
	task_id: string;
	current_state: string;
};
