import CustomFetch from '../CustomFetch';
import type { CustomFetchReturnType } from '../CustomFetch/types';
import { predictMethod } from './methods/predict/browser';
import type { PredictRequest, PredictResponse } from './methods/predict/types';
import type { ApiError } from './methods/files/types';

class VorionLLMSDK {
    private customFetch: typeof CustomFetch;

    constructor(customFetch: typeof CustomFetch) {
        this.customFetch = customFetch;
    }

    predict(request: PredictRequest): Promise<CustomFetchReturnType<PredictResponse, ApiError>> {
        return predictMethod(this.customFetch, request);
    }
}

export default VorionLLMSDK;
