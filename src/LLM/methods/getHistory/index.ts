import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { GetHistoryRequest, GetHistoryResponse, ApiError } from './types';

export function getHistoryMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: GetHistoryRequest): Promise<CustomFetchReturnType<GetHistoryResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/history`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<GetHistoryResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting get history request',
					onFinish: 'Get history request completed',
					onError: 'Error occurred during get history request',
				},
			},
		});
	};
}
