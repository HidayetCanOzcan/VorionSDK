import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { GetLlmConfigResponse, ApiError } from './types';

export function getLlmConfigMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (): Promise<CustomFetchReturnType<GetLlmConfigResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/llm-config`,
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		};

		return customFetch<GetLlmConfigResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting get LLM config request',
					onFinish: 'Get LLM config request completed',
					onError: 'Error occurred during get LLM config request',
				},
			},
		});
	};
}
