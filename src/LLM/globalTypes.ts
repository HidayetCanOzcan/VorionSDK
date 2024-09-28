import { LLMGroupNameOptions, LLMOptions, LoadBalanceStrategyOptions, MemoryOptions, MemoryStrategyOptions } from '../globalEnums';

export type AgentModelParameters = {
	agent_type?: string;
	agent_name?: string;
	tag_name?: string;
	result_number?: number;
	spec_url?: string;
	odbc_connection_string?: string;
	need_authentication?: boolean;
	bearer_token?: string;
	api_key_header?: string;
	api_key?: string;
};

export type PredictionResponse = {
	agent_model_parameters: { [key: string]: string | number | string[] } | null;
	answer: string;
	conversation_state_key: string;
	conversation_type: string;
	images: string[] | null;
	llm_group_name: LLMGroupNameOptions;
	llm_name: LLMOptions;
	load_balancer_strategy_name: LoadBalanceStrategyOptions;
	memory_strategy_name: MemoryStrategyOptions;
	memory_type: MemoryOptions;
	persona_system_message: string | null;
	prompt: Prompt;
	prompt_with_rag_content: string | null;
	rag_content: string | null;
	sources: Source[] | null;
	system_message: string;
	user_id: string;
	user_info_system_message: string;
};
export type Source = {
	data_source: string;
	source_type: string;
};
export type Prompt = {
	analyse_image: boolean;
	create_image: boolean;
	image_quality: string;
	image_size: string;
	image_style: string;
	rag_content: string | null;
	save_prompt_with_rag_content: boolean;
	sensitive_info: boolean;
	text: string;
};
