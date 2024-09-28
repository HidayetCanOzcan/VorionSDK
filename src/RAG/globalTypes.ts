import { EmbedderOptions, IndexerOptions, LoadBalanceStrategyOptions, SplitterTypeOptions, VectorStoreOptions } from '../globalEnums';

export type IngestResponse = {
	current_state: string;
	ingest_request_model: IngestRequestModel;
	ingest_response_model: IngestResponseModel;
	task_id: string;
};

export type IngestRequestModel = {
	base64_files: null;
	chunk_overlap: number;
	chunk_size: number;
	collection_name: string;
	data_sources: Source[];
	embed_documents: boolean;
	embedder_name: EmbedderOptions;
	index_documents: boolean;
	indexer_name: IndexerOptions;
	language: string;
	load_balance_strategy: LoadBalanceStrategyOptions;
	load_documents_from_state: boolean;
	loaded_documents_state_key: string | null;
	persist_directory: string;
	preferred_splitter_type: SplitterTypeOptions;
	save_loaded_documents: boolean;
	separator: string;
	user_id: string;
	vectorstore_name: VectorStoreOptions;
};

export type Source = {
	metadata: DataSourceMetadata;
	parameters: Parameters;
	splitter_settings: null;
	target: string;
	title: null;
	type: string;
};

export type DataSourceMetadata = {};

export type Parameters = {
	max_workers: number;
};

export type IngestResponseModel = {
	chunk_overlap: number;
	chunk_size: number;
	collection_name: string;
	embed_documents: boolean;
	embedder_name: EmbedderOptions;
	error: null;
	index_documents: boolean;
	indexer_name: IndexerOptions;
	is_partial_document_load_error_exists: boolean;
	is_successful: boolean;
	language: null;
	load_result: LoadResult;
	persist_directory: string;
	preferred_splitter_type: SplitterTypeOptions;
	rolledback_document_index: boolean;
	rolledback_document_vector: boolean;
	rolledback_saved_documents_state: boolean;
	separator: null;
	splitted_documents: SplittedDocument[];
	total_embedded_documents_count: null;
	total_indexed_documents_count: null;
	user_id: string;
	vectorstore_name: VectorStoreOptions;
};

export type LoadResult = {
	has_partial_load_error: boolean;
	outcomes: Outcome[];
	total_token_count: number;
};

export type Outcome = {
	documents: Document[];
	error: null;
	source: Source;
	total_token_count: number;
};

export type Document = {
	metadata: DocumentMetadata;
	page_content: string;
	title: null;
};

export type DocumentMetadata = {
	data_source: string;
	document_id: string;
	page_number: string;
	source: string;
	source_type: string;
	token_count: string;
	chunk_id?: number;
	chunk_token_count?: number;
};

export type SplittedDocument = {
	metadata: DocumentMetadata;
	page_content: string;
};
