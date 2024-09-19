import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ComparePredictRequest, ComparePredictResponse, ApiError } from './types';

export function comparePredictMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: ComparePredictRequest): Promise<CustomFetchReturnType<ComparePredictResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/compare-predict`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<ComparePredictResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting compare predict request',
					onFinish: 'Compare predict request completed',
					onError: 'Error occurred during compare predict request',
				},
			},
		});
	};
}
