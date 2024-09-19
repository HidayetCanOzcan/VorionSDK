import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { AIngestResponse } from '../aingest/types';
import { ApiError } from '../embed/types';
import { IngestMultipartRequest } from '../ingest-multipart/types';

export function aingestMultipartMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: IngestMultipartRequest): Promise<CustomFetchReturnType<AIngestResponse, ApiError>> {
		const formData = new FormData();
		formData.append('data', request.data);
		request.files.forEach((file, index) => {
			formData.append(`file${index}`, file);
		});

		const options: OptionsType = {
			url: `${baseUrl}/api/v1/aingest-multipart`,
			method: 'POST',
			body: formData,
		};

		return customFetch<AIngestResponse, ApiError>({
			options,
			settings: {
				showResponse: true,
				messages: {
					onStart: 'Starting async multipart ingest request',
					onFinish: 'Async multipart ingest request initiated',
					onError: 'Error occurred during async multipart ingest request initiation',
				},
			},
		});
	};
}
