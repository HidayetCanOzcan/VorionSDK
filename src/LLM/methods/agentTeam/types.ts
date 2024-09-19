export type AgentDetails = {
	name: string;
	system_message: string;
	need_vision: boolean;
};

export type AgentTeamRequest = {
	team_id: string;
	user_proxy_name?: string | null;
	user_proxy_sys_message?: string | null;
	max_reply_count: number;
	human_input_mode: string;
	code_exec_dir: string;
	assistant_agents: AgentDetails[];
	task: string;
	speaker_selection_method: string;
	cache_seed?: number | null;
};

export type AgentTeamResponse = {
	// Bu tip, API'nin döndürdüğü gerçek yanıta göre güncellenmelidir
	result: string;
};

export type ApiError = {
	message: string;
	status: number;
};
