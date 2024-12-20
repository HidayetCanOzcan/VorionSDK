// Re-export all browser-safe exports
export * from './browser';

// Server-only exports
export { createVorionServer } from './SERVER';
export * as VorionServerTypes from './SERVER/types';

// Client exports
export * as RAGEmbedTypes from './RAG/methods/embed/types';
export * as RAGAembedTypes from './RAG/methods/aembed/types';
export * as RAGIngestTypes from './RAG/methods/ingest/types';
export * as RAGIngestQueryStateTypes from './RAG/methods/ingest-query-state/types';
export * as RAGIngestRollbackTypes from './RAG/methods/ingest-rollback/types';
export * as RAGIngestMultipartTypes from './RAG/methods/ingest-multipart/types';
export * as RAGAingestTypes from './RAG/methods/aingest/types';
export * as RAGLoadTypes from './RAG/methods/load/types';
export * as RAGAloadTypes from './RAG/methods/aload/types';
export * as RetrieveTypes from './RAG/methods/retrieve/types';

export * as AgentABasicTypes from './LLM/methods/agentAbasic/types';
export * as AgentBasicTypes from './LLM/methods/agentBasic/types';
export * as AgentTeamTypes from './LLM/methods/agentTeam/types';
export * as APredictTypes from './LLM/methods/apredict/types';
export * as ComparePredictTypes from './LLM/methods/comparePredict/types';
export * as FilesTypes from './LLM/methods/files/types';
export * as GetHistoryTypes from './LLM/methods/getHistory/types';
export * as GetLlmConfigTypes from './LLM/methods/getLlmConfig/types';
export * as PredictTypes from './LLM/methods/predict/types';

export * as SocketTypes from './SOCKET/types';

export { default as VorionRAGSDK } from './RAG';
export { default as VorionLLMSDK } from './LLM';
export { default as VorionWebSocket } from './SOCKET';
export { default as VorionSTATE } from './STATE';

// Conditional server exports
// if (typeof window === 'undefined') {
// 	const { createVorionServer } = require('./SERVER');
// 	const VorionServerTypes = require('./SERVER/types');

// 	module.exports = {
// 		...module.exports,
// 		createVorionServer,
// 		VorionServerTypes,
// 	};
// }
