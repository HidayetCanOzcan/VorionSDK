import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { AgentAbasicRequest, AgentAbasicResponse, ApiError } from './types';

export function agentAbasicMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: AgentAbasicRequest): Promise<CustomFetchReturnType<AgentAbasicResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/agent/abasic`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<AgentAbasicResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting async basic agent request',
					onFinish: 'Async basic agent request completed',
					onError: 'Error occurred during async basic agent request',
				},
			},
		});
	};
}
