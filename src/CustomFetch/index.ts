import type { CustomFetchProps, CustomFetchReturnType } from './types';

export default async function CustomFetch<ResponseType, ErrorTypes>({
	options,
	settings,
}: CustomFetchProps): Promise<CustomFetchReturnType<ResponseType, ErrorTypes>> {
	const { url, method = 'GET', headers: optionHeaders, body = null, base64Response = false } = options;

	const headers = new Headers(optionHeaders);
	const {
		onSuccess,
		onError,
		onStart,
		messages = {},
		showDuration = false,
		showOptionsSummaryBeforeSent = false,
		showRawResponse = false,
		showResponse = false,
		showStringified = false,
	} = settings || {};

	onStart?.(messages.onStart || '');

	if (showOptionsSummaryBeforeSent) {
		console.log(
			'Sending request with options:',
			showStringified
				? JSON.stringify({ url, method, headers: Object.fromEntries(headers), body }, null, 2)
				: { url, method, headers: Object.fromEntries(headers), body }
		);
	}

	const startTime = showDuration ? performance.now() : 0;

	try {
		const response = await fetch(url, { method, headers, body });

		showDuration && console.log(`🚩 Request duration: ${performance.now() - startTime} ms`);
		showRawResponse && console.log('Raw response:', response);

		const code = response.status;

		if (!response.ok) {
			messages.onFinish && console.log(messages.onFinish);
			const error = await parseResponseBody(response);
			showResponse && logResponse(error, showStringified);
			return createErrorResponse<ResponseType, ErrorTypes>(error as string | object, code);
		}

		messages.onFinish && console.log(messages.onFinish);

		const res = base64Response
			? (Buffer.from(await response.arrayBuffer()).toString('base64') as unknown as ResponseType)
			: ((await parseResponseBody(response)) as ResponseType);

		onSuccess?.(res);
		showResponse && logResponse(res, showStringified);

		return {
			isSuccess: true,
			errors: undefined,
			response: res,
			code,
			createdAt: new Date(),
		};
	} catch (error) {
		if (error instanceof Error) {
			if (error.name === 'AbortError') {
				console.log('Fetch aborted:', url);
				return createErrorResponse<ResponseType, ErrorTypes>('The request was aborted', null);
			}

			messages.onError && console.error(messages.onError);
			onError?.(`An error occurred: ${error.message}`);
			showResponse && logResponse(error, showStringified);

			return createErrorResponse<ResponseType, ErrorTypes>(error.message);
		}
		console.error('An unknown error occurred:', error);
		return createErrorResponse<ResponseType, ErrorTypes>('An unknown error occurred');
	}
}

async function parseResponseBody(response: Response): Promise<unknown> {
	const text = await response.text();
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
}

function createErrorResponse<ResponseType, ErrorTypes>(
	errors: string | object,
	code: number | null = null
): CustomFetchReturnType<ResponseType, ErrorTypes> {
	return {
		isSuccess: false,
		errors: errors as ErrorTypes,
		response: undefined,
		code,
		createdAt: new Date(),
	};
}

function logResponse(response: unknown, stringified: boolean): void {
	console.log('Parsed response:', stringified ? JSON.stringify(response, null, 2) : response);
}
