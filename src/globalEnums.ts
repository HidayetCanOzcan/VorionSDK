export enum LoadBalanceStrategyOptions {
	RoundRobin = 'round_robin',
	WeightedRoundRobin = 'weighted_round_robin',
	DynamicWeightedRoundRobin = 'dynamic_weighted_round_robin',
	Random = 'random',
}
export enum EmbedderOptions {
	Azure = 'azure',
	OpenAI = 'openai',
}
export enum IndexerOptions {
	Elastic = 'elasticsearch',
	ElasticCloud = 'elasticsearch_cloud',
}
export enum LLMOptions {
	Azure = 'azure',
	OpenAI = 'openai',
	Google = 'google',
	Cohere = 'cohere',
	Claude = 'claude',
	Groq = 'groq',
	Oss = 'oss_models',
}
export enum LLMGroupNameOptions {
	'gpt-4' = 'gpt-4',
	'gpt-4o' = 'gpt-4o',
	'gpt-4o-mini' = 'gpt-4o-mini',
	'gpt-4-turbo' = 'gpt-4-turbo',
	'o1' = 'o1',
	'o1-mini' = 'o1-mini',
	'dall-e-3' = 'dall-e-3',
	'claude-3-5-sonnet' = 'claude-3-5-sonnet',
	'command-r' = 'command-r',
	'command-light' = 'command-light',
	'command-r-plus' = 'command-r-plus',
	'gemini-1.5-flash' = 'gemini-1.5-flash',
	'gemini-1.5-pro' = 'gemini-1.5-pro',
	'llama3-70b' = 'llama3-70b',
	'llama3-8b' = 'llama3-8b',
	'mistral-7b' = 'mistral-7b',
	'mixtral-8x7b' = 'mixtral-8x7b',
	'gemma2-7b-it' = 'gemma2-7b-it',
	'gemma2-9b-it' = 'gemma2-9b-it',
}

export enum MemoryOptions {
	InMemory = 'in-memory',
	Redis = 'redis',
}
export enum MemoryStrategyOptions {
	FullSummarize = 'full-summarize',
	Summarize = 'summarize',
	RemoveTop = 'remove-top',
}
export enum PdfLoaderTypeOptions {
	PyPDFDirectoryLoader = 'PyPDFDirectoryLoader',
	PDFMinerLoader = 'PDFMinerLoader',
	PDFPlumberLoader = 'PDFPlumberLoader',
	PyMuPDFLoader = 'PyMuPDFLoader',
	PyPDFLoader = 'PyPDFLoader',
	PyPDFium2Loader = 'PyPDFium2Loader',
	PDFMinerPDFasHTMLLoader = 'PDFMinerPDFasHTMLLoader',
	MathpixPDFLoader = 'MathpixPDFLoader',
	DocumentIntelligenceLoader = 'DocumentIntelligenceLoader',
}
export enum SplitterTypeOptions {
	Recursive = 'recursive',
	Token = 'token',
	Code = 'code',
	character = 'character',
}
export enum VectorStoreOptions {
	Redis = 'redis',
	Chroma = 'chroma',
}
