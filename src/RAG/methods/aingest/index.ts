import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ApiError } from '../embed/types';
import { IngestRequest } from '../ingest/types';
import { AIngestResponse } from './types';

export function aingestMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: IngestRequest): Promise<CustomFetchReturnType<AIngestResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/aingest`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<AIngestResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting async ingest request',
					onFinish: 'Async ingest request initiated',
					onError: 'Error occurred during async ingest request initiation',
				},
			},
		});
	};
}
