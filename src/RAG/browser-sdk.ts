// Browser-safe version of RAG SDK
import CustomFetch from '../CustomFetch';
import type { CustomFetchReturnType } from '../CustomFetch/types';
import type { ApiError } from '../LLM/methods/files/types';

class VorionRAGSDK {
  private customFetch: typeof CustomFetch;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.customFetch = CustomFetch;
    this.baseUrl = baseUrl;
  }

  // Add your browser-safe RAG methods here
  // Example:
  // embed: (request: EmbedRequest) => Promise<CustomFetchReturnType<EmbedResponse, ApiError>>;
}

export default VorionRAGSDK;
