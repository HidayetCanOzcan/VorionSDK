export type IngestRollbackRequest = {
	task_id?: string;
	indexer_name?: string;
	embedder_name?: string;
	vectorstore_name?: string;
	persist_directory?: string;
	collection_name?: string;
	loaded_documents_state_key?: string;
};

export type IngestRollbackResponse = {
	vectorstore_name: string;
	embedder_name: string;
	indexer_name: string;
	persist_directory: string;
	collection_name: string;
	error?: string;
	is_successful: boolean;
	rolledback_document_index: boolean;
	rolledback_document_vector: boolean;
	rolledback_saved_documents_state: boolean;
};
