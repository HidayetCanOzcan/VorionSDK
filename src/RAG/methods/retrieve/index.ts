import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ApiError } from '../embed/types';
import { RetrieveRequest, RetrieveResponse } from './types';

export function retrieveMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: RetrieveRequest): Promise<CustomFetchReturnType<RetrieveResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/retrieve`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<RetrieveResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting document retrieval',
					onFinish: 'Document retrieval completed',
					onError: 'Error occurred during document retrieval',
				},
			},
		});
	};
}
