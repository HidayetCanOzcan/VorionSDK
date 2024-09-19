import { DataSource, LoadOutcome } from '../ingest/types';

export type LoadRequest = {
	data_sources: DataSource[];
	state_key?: string;
	save_loaded_documents?: boolean;
	load_from_state?: boolean;
};

export type LoadResultModel = {
	outcomes: LoadOutcome[];
	has_partial_load_error: boolean;
	total_token_count: number;
};
