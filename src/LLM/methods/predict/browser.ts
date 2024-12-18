import CustomFetch from '../../../CustomFetch';
import type { CustomFetchReturnType, OptionsType } from '../../../CustomFetch/types';
import type { PredictRequest, PredictResponse } from './types';
import type { ApiError } from '../files/types';

export const predictMethod = (
    customFetch: typeof CustomFetch,
    request: PredictRequest
): Promise<CustomFetchReturnType<PredictResponse, ApiError>> => {
    const options: OptionsType = {
        url: '/api/llm/predict',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };

    return customFetch({
        options,
        settings: {
            showResponse: true,
            messages: {
                onStart: 'Starting prediction request',
                onFinish: 'Prediction request completed',
                onError: 'Error occurred during prediction request'
            }
        }
    });
};
