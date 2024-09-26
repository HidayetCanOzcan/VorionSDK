import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { PredictRequest, PredictResponse, ApiError } from './types';

export function predictMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: PredictRequest): Promise<CustomFetchReturnType<PredictResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/predict`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<PredictResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting prediction request',
					onFinish: 'Prediction request completed',
					onError: 'Error occurred during prediction request',
				},
			},
		});
	};
}