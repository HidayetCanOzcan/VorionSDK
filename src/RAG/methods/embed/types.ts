export type EmbedResponse = {
	query_vectors: number[] | null;
	document_vectors: number[][] | null;
	total_document_vector_list_count: number | null;
	vector_space_count: number | null;
	embedder_name: string;
};

export type EmbedRequest = {
	documents?: string[] | null;
	query?: string | null;
	embedder_name: string;
	return_vector_count?: number;
};

export type ApiError = {
	message: string;
	code: number;
};
