import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { AIngestResponse } from '../aingest/types';
import { ApiError } from '../embed/types';
import { IngestMultipartRequest } from '../ingest-multipart/types';

export function aingestMultipartMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: IngestMultipartRequest): Promise<CustomFetchReturnType<AIngestResponse, ApiError>> {
		const formData = new FormData();
		const { data, files } = request;
		formData.append('data', JSON.stringify(data));

		if (Array.isArray(files)) {
			for (const file of files) {
				const arrayBuffer = await file.arrayBuffer();
				const blob = new Blob([arrayBuffer], { type: file.type });
				formData.append('files', blob, file.name);
			}
		} else if (files) {
			const arrayBuffer = await (files as File).arrayBuffer();
			const blob = new Blob([arrayBuffer], { type: (files as File).type });
			formData.append('files', blob, (files as File).name);
		}

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
