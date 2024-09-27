import CustomFetch from '../CustomFetch';
import type { CustomFetchReturnType } from '../CustomFetch/types';
import { predictMethod } from './methods/predict';
import type { PredictRequest, PredictResponse } from './methods/predict/types';
import { apredictMethod } from './methods/apredict';
import type { APredictRequest, APredictResponse } from './methods/apredict/types';
import { getHistoryMethod } from './methods/getHistory';
import type { GetHistoryRequest, GetHistoryResponse } from './methods/getHistory/types';
import { getLlmConfigMethod } from './methods/getLlmConfig';
import type { GetLlmConfigResponse } from './methods/getLlmConfig/types';
import { comparePredictMethod } from './methods/comparePredict';
import type { ComparePredictRequest, ComparePredictResponse } from './methods/comparePredict/types';
import { agentBasicMethod } from './methods/agentBasic';
import type { AgentBasicRequest, AgentBasicResponse } from './methods/agentBasic/types';
import { agentAbasicMethod } from './methods/agentAbasic';
import type { AgentAbasicRequest, AgentAbasicResponse } from './methods/agentAbasic/types';
import { agentTeamMethod } from './methods/agentTeam';
import type { AgentTeamRequest, AgentTeamResponse } from './methods/agentTeam/types';
import { getFileMethod, getAllFilesMethod } from './methods/files';
import type { ApiError } from './methods/files/types';
import { DaprClient } from '@dapr/dapr';

class VorionLLMSDK {
	private daprClient?: DaprClient;
	private customFetch: typeof CustomFetch;
	private baseUrl: string;

	constructor(baseUrl: string, daprClient?: DaprClient) {
		this.daprClient = daprClient;
		this.customFetch = CustomFetch;
		this.baseUrl = baseUrl;
		this.predict = predictMethod(this.baseUrl, this.customFetch, this.daprClient);
		this.apredict = apredictMethod(this.baseUrl, this.customFetch);
		this.getHistory = getHistoryMethod(this.baseUrl, this.customFetch);
		this.getLlmConfig = getLlmConfigMethod(this.baseUrl, this.customFetch);
		this.comparePredict = comparePredictMethod(this.baseUrl, this.customFetch);
		this.agentBasic = agentBasicMethod(this.baseUrl, this.customFetch);
		this.agentAbasic = agentAbasicMethod(this.baseUrl, this.customFetch);
		this.agentTeam = agentTeamMethod(this.baseUrl, this.customFetch);
		this.getFile = getFileMethod(this.baseUrl, this.customFetch);
		this.getAllFiles = getAllFilesMethod(this.baseUrl, this.customFetch);
	}

	predict: (request: PredictRequest, useDapr?: boolean) => Promise<CustomFetchReturnType<PredictResponse, ApiError>>;
	apredict: (request: APredictRequest) => Promise<CustomFetchReturnType<APredictResponse, ApiError>>;
	getHistory: (request: GetHistoryRequest) => Promise<CustomFetchReturnType<GetHistoryResponse, ApiError>>;
	getLlmConfig: () => Promise<CustomFetchReturnType<GetLlmConfigResponse, ApiError>>;
	comparePredict: (request: ComparePredictRequest) => Promise<CustomFetchReturnType<ComparePredictResponse, ApiError>>;
	agentBasic: (request: AgentBasicRequest) => Promise<CustomFetchReturnType<AgentBasicResponse, ApiError>>;
	agentAbasic: (request: AgentAbasicRequest) => Promise<CustomFetchReturnType<AgentAbasicResponse, ApiError>>;
	agentTeam: (request: AgentTeamRequest) => Promise<CustomFetchReturnType<AgentTeamResponse, ApiError>>;
	getFile: (workdirPath: string, convKey: string, fileName: string) => Promise<CustomFetchReturnType<Blob, ApiError>>;
	getAllFiles: (workdirPath: string, convKey: string) => Promise<CustomFetchReturnType<Blob, ApiError>>;
}

export default VorionLLMSDK;
