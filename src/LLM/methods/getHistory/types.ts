import { LLMGroupNameOptions, LLMOptions, LoadBalanceStrategyOptions, MemoryOptions, MemoryStrategyOptions } from '../../../globalEnums';

export type GetHistoryRequest = {
	conversation_state_key: string;
	memory_type: MemoryOptions;
	memory_strategy_name?: MemoryStrategyOptions;
	system_message?: string;
	llm_name?: LLMOptions | string;
	llm_group_name?: LLMGroupNameOptions | string;
	load_balancer_strategy_name?: LoadBalanceStrategyOptions;
};

export type LLMMessage = {
	role: string;
	content: string;
	sensitive_info: boolean;
	removed_from_history: boolean;
	added_to_summarize_history: boolean;
	rag_content?: string;
	save_prompt_with_rag_content?: boolean;
	prompt_with_rag_content?: string;
	is_summary?: boolean;
};

export type GetHistoryResponse = LLMMessage[];

export type ApiError = {
	message: string;
	status: number;
};
