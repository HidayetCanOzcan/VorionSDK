import { LLMGroupNameOptions, LLMOptions, LoadBalanceStrategyOptions, MemoryOptions, MemoryStrategyOptions } from '../../../globalEnums';
import { AgentModelParameters } from '../../globalTypes';

export type APredictRequest = {
	conversation_state_key: string;
	prompt: PredictionPrompt;
	images?: string[] | null;
	system_message?: string | null;
	llm_name: LLMOptions | string;
	llm_group_name: LLMGroupNameOptions | string;
	load_balancer_strategy_name: LoadBalanceStrategyOptions;
	memory_type?: MemoryOptions;
	memory_strategy_name?: MemoryStrategyOptions;
	agent_model_parameters?: AgentModelParameters;
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

export type APredictResponse = {
	task_id: string;
	message: string;
	status: string;
	error: string | null;
	events_to_subscribe_for_notification: string[];
};

export type ApiError = {
	message: string;
	status: number;
};
