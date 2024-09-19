import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ApiError, EmbedRequest, EmbedResponse } from './types';

export function embedMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: EmbedRequest): Promise<CustomFetchReturnType<EmbedResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/embed`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<EmbedResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting embed request',
					onFinish: 'Embed request completed',
					onError: 'Error occurred during embed request',
				},
			},
		});
	};
}
