import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ApiError } from '../embed/types';
import { LoadRequest } from '../load/types';
import { ALoadResponse } from './types';

export function aloadMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: LoadRequest): Promise<CustomFetchReturnType<ALoadResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/aload`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<ALoadResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting async document load',
					onFinish: 'Async document load initiated',
					onError: 'Error occurred during async document load initiation',
				},
			},
		});
	};
}
