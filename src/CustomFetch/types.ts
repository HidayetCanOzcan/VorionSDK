export type OptionsType = {
	url: string;
	method?: string;
	headers?: HeadersInit;
	body?: BodyInit;
	base64Response?: boolean;
};

export type SettingsType<T = unknown> = {
	onSuccess?: (response: T) => void;
	onError?: (error: string) => void;
	onStart?: (message: string) => void;
	messages?: {
		onStart?: string;
		onError?: string;
		onFinish?: string;
	};
	showDuration?: boolean;
	showOptionsSummaryBeforeSent?: boolean;
	showRawResponse?: boolean;
	showResponse?: boolean;
	showStringified?: boolean;
};

export type CustomFetchProps = {
	options: OptionsType;
	settings?: SettingsType;
};

export type CustomFetchReturnType<ResponseType, ErrorTypes> = {
	isSuccess: boolean;
	errors: ErrorTypes | undefined;
	response: ResponseType | undefined;
	code: number | null;
	createdAt: string | Date;
};
