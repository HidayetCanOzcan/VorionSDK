import { DaprClient, HttpMethod } from '@dapr/dapr';
import CustomFetch from '../../../CustomFetch';
import { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import { PredictRequest, PredictResponse, ApiError } from './types';
import { VorionMethodPaths, VorionServiceAppIds } from '../../../globalEnums';

export function predictMethod(baseUrl: string, customFetch: typeof CustomFetch, daprClient?: DaprClient) {
	return async function (request: PredictRequest, useDapr: boolean = false): Promise<CustomFetchReturnType<PredictResponse, ApiError>> {
		if (!useDapr) {
			const options: OptionsType = {
				url: `${baseUrl}/api/v1/predict`,
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(request),
			};

			return customFetch<PredictResponse, ApiError>({
				options,
				settings: {
					showResponse: true,
					messages: {
						onStart: 'Starting prediction request',
						onFinish: 'Prediction request completed',
						onError: 'Error occurred during prediction request',
					},
				},
			});
		} else if (daprClient && useDapr) {
			try {
				const response = await daprClient.invoker.invoke(
					VorionServiceAppIds.LLM,
					VorionMethodPaths.LLM_PREDICTION_SERVICE,
					HttpMethod.POST,
					request
				);
				return {
					isSuccess: true,
					errors: undefined,
					response: response as PredictResponse,
					code: 200,
					createdAt: new Date(),
				};
			} catch (error) {
				return {
					isSuccess: false,
					errors: { message: (error as Error).message, status: 500 },
					response: undefined,
					code: 500,
					createdAt: new Date(),
				};
			}
		} else
			return {
				isSuccess: false,
				errors: { message: 'Unexpected Error', status: 500 },
				response: undefined,
				code: 500,
				createdAt: new Date(),
			};
	};
}
