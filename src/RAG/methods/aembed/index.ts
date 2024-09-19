import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ApiError } from '../embed/types';
import { AEmbedRequest, AEmbedResponse } from './types';

export function aembedMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: AEmbedRequest): Promise<CustomFetchReturnType<AEmbedResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/aembed`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<AEmbedResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting async embed request',
					onFinish: 'Async embed request completed',
					onError: 'Error occurred during async embed request',
				},
			},
		});
	};
}
