export type RetrieveRequest = {
	embedder_name?: string;
	indexer_name?: string;
	vectorstore_name?: string;
	persist_directory?: string;
	collection_name?: string;
	search_in_vectorstore: boolean;
	search_in_indexstore: boolean;
	search_result_count_for_vectorstore: number;
	search_result_count_for_indexstore: number;
	query: string;
	filter_metadata?: Record<string, unknown>;
	k: number;
	load_balance_strategy?: string;
	use_rerank?: boolean;
	reranker_name?: string;
	user_id?: string;
};

export type RetrievedDocument = {
	page_content: string;
	metadata: Record<string, unknown>;
};

export type RetrieveResponse = {
	calculated_relevant_documents: Array<[RetrievedDocument, number]>;
	relevant_documents_with_scores_from_vectorstore?: Array<[RetrievedDocument, number]>;
	relevant_documents_with_scores_from_indexstore?: Array<[RetrievedDocument, number]>;
	vectorstore_name: string;
	embedder_name: string;
	indexer_name: string;
	persist_directory: string;
	collection_name: string;
	search_result_count_for_indexstore?: number;
	search_result_count_for_vectorstore?: number;
	search_in_vectorstore: boolean;
	search_in_indexstore: boolean;
	k: number;
	query: string;
	user_id?: string;
};
