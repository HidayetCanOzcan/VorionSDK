export type LlmConfig = {
	[key: string]: string[];
};

export type GetLlmConfigResponse = {
	llms: LlmConfig;
};

export type ApiError = {
	message: string;
	status: number;
};
