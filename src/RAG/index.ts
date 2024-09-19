import CustomFetch from '../CustomFetch';
import { CustomFetchReturnType } from '../CustomFetch/types';
import { aembedMethod } from './methods/aembed';
import { AEmbedRequest, AEmbedResponse } from './methods/aembed/types';
import { aingestMethod } from './methods/aingest';
import { aingestMultipartMethod } from './methods/aingest-multipart';
import { AIngestResponse } from './methods/aingest/types';
import { aloadMethod } from './methods/aload';
import { ALoadResponse } from './methods/aload/types';
import { embedMethod } from './methods/embed';
import { ApiError, EmbedRequest, EmbedResponse } from './methods/embed/types';
import { ingestMethod } from './methods/ingest';
import { ingestMultipartMethod } from './methods/ingest-multipart';
import { IngestMultipartRequest } from './methods/ingest-multipart/types';
import { queryIngestStateMethod } from './methods/ingest-query-state';
import { IngestDocumentsEventModel, QueryIngestStateRequest } from './methods/ingest-query-state/types';
import { rollbackIngestMethod } from './methods/ingest-rollback';
import { IngestRollbackRequest, IngestRollbackResponse } from './methods/ingest-rollback/types';
import { IngestRequest, IngestResponse } from './methods/ingest/types';
import { loadMethod } from './methods/load';
import { LoadRequest, LoadResultModel } from './methods/load/types';
import { retrieveMethod } from './methods/retrieve';
import { RetrieveRequest, RetrieveResponse } from './methods/retrieve/types';

class VorionRAGSDK {
	private customFetch: typeof CustomFetch;
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.customFetch = CustomFetch;
		this.baseUrl = baseUrl;
		this.embed = embedMethod(this.baseUrl, this.customFetch);
		this.aembed = aembedMethod(this.baseUrl, this.customFetch);
		this.ingest = ingestMethod(this.baseUrl, this.customFetch);
		this.aingest = aingestMethod(this.baseUrl, this.customFetch);
		this.ingestMultipart = ingestMultipartMethod(this.baseUrl, this.customFetch);
		this.aingestMultipart = aingestMultipartMethod(this.baseUrl, this.customFetch);
		this.queryIngestState = queryIngestStateMethod(this.baseUrl, this.customFetch);
		this.rollbackIngest = rollbackIngestMethod(this.baseUrl, this.customFetch);
		this.load = loadMethod(this.baseUrl, this.customFetch);
		this.aload = aloadMethod(this.baseUrl, this.customFetch);
		this.retrieve = retrieveMethod(this.baseUrl, this.customFetch);
	}

	embed: (request: EmbedRequest) => Promise<CustomFetchReturnType<EmbedResponse, ApiError>>;
	aembed: (request: AEmbedRequest) => Promise<CustomFetchReturnType<AEmbedResponse, ApiError>>;
	ingest: (request: IngestRequest) => Promise<CustomFetchReturnType<IngestResponse, ApiError>>;
	aingest: (request: IngestRequest) => Promise<CustomFetchReturnType<AIngestResponse, ApiError>>;
	ingestMultipart: (request: IngestMultipartRequest) => Promise<CustomFetchReturnType<IngestResponse, ApiError>>;
	aingestMultipart: (request: IngestMultipartRequest) => Promise<CustomFetchReturnType<AIngestResponse, ApiError>>;
	queryIngestState: (request: QueryIngestStateRequest) => Promise<CustomFetchReturnType<IngestDocumentsEventModel, ApiError>>;
	rollbackIngest: (request: IngestRollbackRequest) => Promise<CustomFetchReturnType<IngestRollbackResponse, ApiError>>;
	load: (request: LoadRequest) => Promise<CustomFetchReturnType<LoadResultModel, ApiError>>;
	aload: (request: LoadRequest) => Promise<CustomFetchReturnType<ALoadResponse, ApiError>>;
	retrieve: (request: RetrieveRequest) => Promise<CustomFetchReturnType<RetrieveResponse, ApiError>>;
}

export default VorionRAGSDK;
