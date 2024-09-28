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
	//TODO: null values will be updated
	content: string;
	rag_content: null;
	prompt_with_rag_content: null;
	message_id: string;
	user_id: string;
	conversation_id: string;
	conversation_type: string;
	role: 'system' | 'assistant' | 'user' | 'human' | 'ai';
	image_content: null;
	send_date_time: string;
	sources: null;
	is_sensitive_info: boolean;
	message_advanced_options: {
		conversation_state_key: string;
		llm_type: LLMOptions;
		llm_group_name: LLMGroupNameOptions;
		system_message: string;
		memory_type: MemoryOptions;
		memory_strategy: MemoryStrategyOptions;
		load_balance_strategy: LoadBalanceStrategyOptions;
		search_in_vector_store: boolean;
		vector_store_retrieve_count: number;
		search_in_index_store: boolean;
		index_store_retrieve_count: number;
	};
};
