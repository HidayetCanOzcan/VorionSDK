import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ApiError } from '../embed/types';
import { IngestRequest, IngestResponse } from './types';

export function ingestMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: IngestRequest): Promise<CustomFetchReturnType<IngestResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/ingest`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<IngestResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting ingest request',
					onFinish: 'Ingest request completed',
					onError: 'Error occurred during ingest request',
				},
			},
		});
	};
}
