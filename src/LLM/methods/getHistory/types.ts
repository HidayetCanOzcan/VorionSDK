export type GetHistoryRequest = {
	conversation_state_key: string;
	system_message?: string | null;
	llm_name: string;
	llm_group_name?: string | null;
	load_balancer_strategy_name: string;
	memory_type?: string | null;
	memory_strategy_name?: string | null;
};

export type LLMMessage = {
	role: string;
	content: string;
	sensitive_info: boolean;
	removed_from_history: boolean;
	added_to_summarize_history: boolean;
	rag_content?: string | null;
	save_prompt_with_rag_content?: boolean | null;
	prompt_with_rag_content?: string | null;
	is_summary?: boolean | null;
};

export type GetHistoryResponse = LLMMessage[];

export type ApiError = {
	message: string;
	status: number;
};
