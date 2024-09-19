import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ApiError } from '../embed/types';
import { IngestDocumentsEventModel, QueryIngestStateRequest } from './types';

export function queryIngestStateMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: QueryIngestStateRequest): Promise<CustomFetchReturnType<IngestDocumentsEventModel, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/ingest/query-state`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<IngestDocumentsEventModel, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting ingest state query',
					onFinish: 'Ingest state query completed',
					onError: 'Error occurred during ingest state query',
				},
			},
		});
	};
}
