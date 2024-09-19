import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ApiError } from '../embed/types';
import { LoadRequest, LoadResultModel } from './types';

export function loadMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: LoadRequest): Promise<CustomFetchReturnType<LoadResultModel, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/load`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<LoadResultModel, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting document load',
					onFinish: 'Document load completed',
					onError: 'Error occurred during document load',
				},
			},
		});
	};
}
