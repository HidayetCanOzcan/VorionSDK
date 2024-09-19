import CustomFetch from '../../../CustomFetch';
import type { CustomFetchProps, CustomFetchReturnType } from '../../../CustomFetch/types';
import { ApiError } from './types';

export function getFileMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (workdirPath: string, convKey: string, fileName: string): Promise<CustomFetchReturnType<Blob, ApiError>> {
		const options: CustomFetchProps['options'] = {
			url: `${baseUrl}/api/files/${workdirPath}/${convKey}/${fileName}`,
			method: 'GET',
			base64Response: true, // Dosya indirme için base64 kullanıyoruz
		};

		const settings: CustomFetchProps['settings'] = {
			showResponse: true,
			messages: {
				onStart: 'Starting file download',
				onFinish: 'File download completed',
				onError: 'Error occurred during file download',
			},
		};

		const result = await customFetch<Blob, ApiError>({ options, settings });

		if (result.isSuccess && result.response) {
			// base64'ten Blob'a çevirme
			const byteCharacters = atob(result.response as unknown as string);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			return {
				...result,
				response: new Blob([byteArray], { type: 'application/octet-stream' }),
			};
		}

		return result;
	};
}

export function getAllFilesMethod(baseUrl: string, customFetch: typeof CustomFetch) {
	return async function (workdirPath: string, convKey: string): Promise<CustomFetchReturnType<Blob, ApiError>> {
		const options: CustomFetchProps['options'] = {
			url: `${baseUrl}/api/files/${workdirPath}/${convKey}`,
			method: 'GET',
			base64Response: true, // ZIP dosyası indirme için base64 kullanıyoruz
		};

		const settings: CustomFetchProps['settings'] = {
			showResponse: true,
			messages: {
				onStart: 'Starting all files download',
				onFinish: 'All files download completed',
				onError: 'Error occurred during all files download',
			},
		};

		const result = await customFetch<Blob, ApiError>({ options, settings });

		if (result.isSuccess && result.response) {
			// base64'ten Blob'a çevirme
			const byteCharacters = atob(result.response as unknown as string);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			return {
				...result,
				response: new Blob([byteArray], { type: 'application/zip' }),
			};
		}

		return result;
	};
}
