export type AgentAbasicRequest = {
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
	llm_name: string;
	llm_group_name?: string | null;
	load_balancer_strategy_name: string;
	memory_type?: string | null;
	memory_strategy_name?: string | null;
	agent_model_parameters?: Record<string, string | number | boolean | string[]> | null;
	repsond_in_one_go?: boolean;
	available_tools?: string[] | null;
};

export type AgentAbasicResponse = {
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
