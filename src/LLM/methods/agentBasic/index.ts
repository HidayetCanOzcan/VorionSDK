import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { AgentBasicRequest, AgentBasicResponse, ApiError } from './types';

export function agentBasicMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: AgentBasicRequest): Promise<CustomFetchReturnType<AgentBasicResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/agent/basic`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<AgentBasicResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting basic agent request',
					onFinish: 'Basic agent request completed',
					onError: 'Error occurred during basic agent request',
				},
			},
		});
	};
}
