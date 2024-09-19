import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { APredictRequest, APredictResponse, ApiError } from './types';

export function apredictMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: APredictRequest): Promise<CustomFetchReturnType<APredictResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/apredict`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<APredictResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting async prediction request',
					onFinish: 'Async prediction request completed',
					onError: 'Error occurred during async prediction request',
				},
			},
		});
	};
}
