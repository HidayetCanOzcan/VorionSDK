import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ApiError } from '../embed/types';
import { IngestResponse } from '../ingest/types';
import { IngestMultipartRequest } from './types';

export function ingestMultipartMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: IngestMultipartRequest): Promise<CustomFetchReturnType<IngestResponse, ApiError>> {
		const formData = new FormData();
		formData.append('data', request.data);
		request.files.forEach((file, index) => {
			formData.append(`file${index}`, file);
		});

		const options: OptionsType = {
			url: `${baseUrl}/api/v1/ingest-multipart`,
			method: 'POST',
			body: formData,
		};

		return customFetch<IngestResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting multipart ingest request',
					onFinish: 'Multipart ingest request completed',
					onError: 'Error occurred during multipart ingest request',
				},
			},
		});
	};
}
