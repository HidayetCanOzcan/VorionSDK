export type AEmbedRequest = {
	documents?: string[] | null;
	query?: string | null;
	embedder_name: string;
	return_vector_count?: number;
};

export type AEmbedResponse = {
	task_id: string;
	message: string;
	status: string;
	error: string | null;
	events_to_subscribe_for_notification: string[];
};
