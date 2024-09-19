import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { AgentTeamRequest, AgentTeamResponse, ApiError } from './types';

export function agentTeamMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: AgentTeamRequest): Promise<CustomFetchReturnType<AgentTeamResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/agent/team`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<AgentTeamResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting agent team request',
					onFinish: 'Agent team request completed',
					onError: 'Error occurred during agent team request',
				},
			},
		});
	};
}
