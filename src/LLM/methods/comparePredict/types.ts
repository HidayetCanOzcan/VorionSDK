export type ComparePredictRequest = {
	conversation_state_key: string;
	prompt: PredictionPrompt;
	images?: string[] | null;
	system_message?: string | null;
	llm_name: string;
	llm_group_name?: string | null;
	load_balancer_strategy_name: string;
	memory_type?: string | null;
	memory_strategy_name?: string | null;
	agent_model_parameters?: Record<string, string | number | boolean | string[]> | null;
	user_id?: string | null;
};

export type PredictionPrompt = {
	text: string | null;
	sensitive_info: boolean;
	rag_content?: string | null;
	save_prompt_with_rag_content?: boolean | null;
	create_image?: boolean | null;
	analyse_image?: boolean | null;
	image_size?: string | null;
	image_style?: string | null;
	image_quality?: string | null;
};

export type ComparePredictResponse = {
	[key: string]: string;
};

export type ApiError = {
	message: string;
	status: number;
};
