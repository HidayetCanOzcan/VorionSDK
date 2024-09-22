import { LLMGroupNameOptions, LLMOptions, LoadBalanceStrategyOptions, MemoryOptions, MemoryStrategyOptions } from '../../../globalEnums';
import { AgentModelParameters } from '../../globalTypes';

export type AgentBasicRequest = {
	team_id: string;
	assistant_name: string;
	assistant_sys_message: string;
	assistant_need_vision: boolean;
	user_proxy_name?: string | null;
	user_proxy_sys_message?: string | null;
	max_reply_count: number;
	human_input_mode: string;
	code_exec_dir: string;
	task: string;
	cache_seed?: number | null;
	conversation_state_key: string;
	images?: string[] | null;
	system_message?: string | null;
	llm_name: LLMOptions | string;
	llm_group_name: LLMGroupNameOptions | string;
	load_balancer_strategy_name: LoadBalanceStrategyOptions;
	memory_type?: MemoryOptions;
	memory_strategy_name?: MemoryStrategyOptions;
	agent_model_parameters?: AgentModelParameters;
	repsond_in_one_go?: boolean;
	available_tools?: string[] | null;
};

export type AgentBasicResponse = {
	conversation_state_key: string;
	task: string;
	images?: string[] | null;
	files?: string[] | null;
	system_message?: string | null;
	llm_name: LLMOptions | string;
	llm_group_name: LLMGroupNameOptions | string;
	load_balancer_strategy_name: LoadBalanceStrategyOptions;
	full_conversation: string;
};

export type ApiError = {
	message: string;
	status: number;
};
