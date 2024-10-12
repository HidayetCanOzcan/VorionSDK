import { EmbedderOptions, IndexerOptions, LoadBalanceStrategyOptions, SplitterTypeOptions, VectorStoreOptions } from '../../../globalEnums';
import { DataSource } from '../ingest/types';

export type IngestMultipartRequest = {
	data: IngestMultipartData;
	files: File[] | File;
};
export interface IngestMultipartData {
	indexer_name: IndexerOptions;
	embedder_name: EmbedderOptions;
	vectorstore_name: VectorStoreOptions;
	data_sources: DataSource[] | null;
	persist_directory: string;
	collection_name: string;
	preferred_splitter_type: SplitterTypeOptions;
	chunk_size: number;
	chunk_overlap: number;
	separator: string;
	language: string;
	embed_documents: boolean;
	index_documents: boolean;
	loaded_documents_state_key: string;
	save_loaded_documents: boolean;
	load_documents_from_state: boolean;
	load_balance_strategy: LoadBalanceStrategyOptions;
	user_id: string;
}
