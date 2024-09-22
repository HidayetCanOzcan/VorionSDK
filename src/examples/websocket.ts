import { LLMGroupNameOptions, LLMOptions, LoadBalanceStrategyOptions, MemoryOptions, MemoryStrategyOptions } from '../globalEnums';
import VorionLLMSDK from '../LLM';
import { APredictRequest } from '../LLM/methods/apredict/types';
import VorionRAGSDK from '../RAG';
import VorionWebSocket from '../SOCKET';
import { VorionEvents } from '../SOCKET/types';
import * as path from 'path';

const RAG_HOST = process.env.RAG_HOST || 'https://your-rag-api-base-url.com';
const LLM_HOST = process.env.LLM_HOST || 'https://your-llm-api-base-url.com';
const WS_HOST = process.env.WS_HOST || 'wss://your-websocket-url.com';
const SESSION_ID = 'unique-session-id.c'; // Generate or obtain this as needed, must be end with letter "c"

const ragSdk = new VorionRAGSDK(RAG_HOST);
const llmSdk = new VorionLLMSDK(LLM_HOST);
const socket = VorionWebSocket(WS_HOST, SESSION_ID);

socket.on(VorionEvents.PREDICTION_COMPLETE, (payload) => {
	console.log('Prediction complete:', payload);
});

socket.on(VorionEvents.INGEST_DOCUMENTS_SUCCEEDED, (payload) => {
	console.log('Document ingestion succeeded:', payload);
});

async function ingestDocumentExample() {
	const filePath = path.resolve('ai_ml_intro.txt');

	const collection_name = `doc_${Math.random().toString(36)}`;
	const ingestRequest = {
		data_sources: [
			{
				type: 'txt',
				target: filePath,
				metadata: { subject: 'AI and ML introduction' },
				parameters: {},
			},
		],
		embedder_name: 'azure',
		vectorstore_name: 'elastic',
		collection_name,
		embed_documents: true,
		index_documents: true,
	};

	try {
		const ingestResult = await ragSdk.aingest(ingestRequest);
		console.log('Ingestion initiated. Task ID:', ingestResult.response?.task_id);
	} catch (error) {
		console.error('Error initiating ingestion:', error);
	}
}
async function predictExample() {
	const predictRequest: APredictRequest = {
		conversation_state_key: SESSION_ID,
		prompt: {
			text: 'What is the capital of France?',
			sensitive_info: false,
		},
		llm_name: LLMOptions.OpenAI,
		llm_group_name: LLMGroupNameOptions['gpt-4'],
		memory_strategy_name: MemoryStrategyOptions.FullSummarize,
		memory_type: MemoryOptions.Redis,
		user_id: 'test-user',
		load_balancer_strategy_name: LoadBalanceStrategyOptions.DynamicWeightedRoundRobin,
	};

	try {
		const predictResult = await llmSdk.apredict(predictRequest);
		console.log('Prediction initiated. Task ID:', predictResult.response?.task_id);
	} catch (error) {
		console.error('Error initiating prediction:', error);
	}
}

ingestDocumentExample();
predictExample();

process.on('SIGINT', () => {
	console.log('Closing WebSocket connection');
	socket.close();
	process.exit();
});
