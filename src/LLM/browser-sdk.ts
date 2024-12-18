import CustomFetch from '../CustomFetch';
import type { CustomFetchReturnType } from '../CustomFetch/types';
import { predictMethod } from './methods/predict/browser';
import type { PredictRequest, PredictResponse } from './methods/predict/types';
import type { ApiError } from './methods/files/types';

class VorionLLMSDK {
    private baseUrl: string;
    private predict: ReturnType<typeof predictMethod>;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.predict = predictMethod(this.baseUrl, CustomFetch);
    }

    async predictText(request: PredictRequest): Promise<CustomFetchReturnType<PredictResponse, ApiError>> {
        return this.predict(request);
    }
}

export default VorionLLMSDK;
