export type DataSource = {
	title?: string;
	type: 'file' | 'url' | 'website' | 'youtube' | 'github';
	target: string;
	metadata: Record<string, string | number | boolean>;
	parameters: Record<string, unknown> & { use_selenium?: boolean };
	splitter_settings?: {
		chunk_size?: number;
		chunk_overlap?: number;
		separator?: string;
		language?: string;
		splitter_type?: string;
	};
};

export type IngestRequest = {
	indexer_name?: string;
	embedder_name?: string;
	vectorstore_name?: string;
	data_sources: DataSource[];
	persist_directory?: string;
	collection_name?: string;
	preferred_splitter_type?: string;
	chunk_size?: number;
	chunk_overlap?: number;
	separator?: string;
	language?: string;
	embed_documents?: boolean;
	index_documents?: boolean;
	loaded_documents_state_key?: string;
	save_loaded_documents?: boolean;
	load_documents_from_state?: boolean;
	load_balance_strategy?: string;
	user_id?: string;
	base64_files?: string[];
};

export type LoadOutcome = {
	source: DataSource;
	documents: Array<{
		title?: string;
		page_content: string;
		metadata: Record<string, string | number | boolean>;
	}>;
	error?: string;
	total_token_count?: number;
};

export type LoadResult = {
	outcomes: LoadOutcome[];
	has_partial_load_error: boolean;
	total_token_count: number;
};

export type IngestResponse = {
	load_result?: LoadResult;
	splitted_documents?: Array<{
		title?: string;
		page_content: string;
		metadata: Record<string, string | number | boolean>;
	}>;
	total_embedded_documents_count?: number;
	total_indexed_documents_count?: number;
	vectorstore_name: string;
	embedder_name: string;
	indexer_name: string;
	persist_directory: string;
	collection_name: string;
	preferred_splitter_type?: string;
	chunk_size?: number;
	chunk_overlap?: number;
	separator?: string;
	language?: string;
	error?: string;
	is_successful: boolean;
	is_partial_document_load_error_exists: boolean;
	embed_documents: boolean;
	index_documents: boolean;
	rolledback_document_index: boolean;
	rolledback_document_vector: boolean;
	rolledback_saved_documents_state: boolean;
	user_id?: string;
};
