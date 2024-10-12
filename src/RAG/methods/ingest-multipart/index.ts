import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { ApiError } from '../embed/types';
import { IngestResponse } from '../ingest/types';
import { IngestMultipartRequest } from './types';

export function ingestMultipartMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (request: IngestMultipartRequest): Promise<CustomFetchReturnType<IngestResponse, ApiError>> {
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
