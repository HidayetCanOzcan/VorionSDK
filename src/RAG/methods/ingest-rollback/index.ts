import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ApiError } from '../embed/types';
import { IngestRollbackRequest, IngestRollbackResponse } from './types';

export function rollbackIngestMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: IngestRollbackRequest): Promise<CustomFetchReturnType<IngestRollbackResponse, ApiError>> {
		const options: OptionsType = {
			url: `${baseUrl}/api/v1/ingest/rollback-ingest`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		};

		return customFetch<IngestRollbackResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting ingest rollback',
					onFinish: 'Ingest rollback completed',
					onError: 'Error occurred during ingest rollback',
				},
			},
		});
	};
}
