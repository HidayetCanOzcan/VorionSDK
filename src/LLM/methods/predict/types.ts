import { LLMGroupNameOptions, LLMOptions, LoadBalanceStrategyOptions, MemoryOptions, MemoryStrategyOptions } from '../../../globalEnums';
import { AgentModelParameters } from '../../globalTypes';

export type PredictRequest = {
	conversation_state_key: string;
	prompt: PredictionPrompt;
	system_message?: string;
	llm_name: LLMOptions | string;
	llm_group_name: LLMGroupNameOptions | string;
	load_balancer_strategy_name: LoadBalanceStrategyOptions;
	memory_type: MemoryOptions;
	memory_strategy_name: MemoryStrategyOptions;
	user_id: string;
	images?: string[];
	language?: string;
	agent_model_parameters?: AgentModelParameters;
};

export type PredictionPrompt = {
	text: string;
	sensitive_info?: boolean;
	rag_content?: string;
	save_prompt_with_rag_content?: boolean;
	create_image?: boolean;
	analyse_image?: boolean;
	image_size?: string;
	image_style?: string;
	image_quality?: string;
};

export type PredictResponse = {
	conversation_state_key: string;
	prompt: PredictionPrompt;
	images?: string[];
	system_message?: string;
	llm_name: LLMOptions | string;
	llm_group_name: LLMGroupNameOptions | string;
	load_balancer_strategy_name: LoadBalanceStrategyOptions;
	memory_type: MemoryOptions;
	memory_strategy_name: MemoryStrategyOptions;
	agent_model_parameters?: AgentModelParameters;
	answer: string;
	user_id: string | null;
};

export type ApiError = {
	message: string;
	status: number;
};
