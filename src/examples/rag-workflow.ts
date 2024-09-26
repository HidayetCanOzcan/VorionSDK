import { pathToFileURL } from 'url';
import { EmbedderOptions, IndexerOptions, LoadBalanceStrategyOptions, SplitterTypeOptions, VectorStoreOptions } from '../globalEnums';
import VorionRAGSDK from '../RAG';
import { QueryIngestStateRequest } from '../RAG/methods/ingest-query-state/types';
import { IngestRequest } from '../RAG/methods/ingest/types';
import { RetrieveRequest } from '../RAG/methods/retrieve/types';
import * as path from 'path';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
async function runRAGWorkflow() {
	if (!process.env.RAG_HOST) {
		console.log('Please create .env file and put a varible with name RAG_HOST.');
		return;
	}
	const sdk = new VorionRAGSDK(process.env.RAG_HOST);

	// const filePath = path.resolve('CV.pdf');

	const collection_name = `doc_${Math.random().toString(36)}`;

	const ingestRequest: IngestRequest = {
		embedder_name: EmbedderOptions.OpenAI,
		indexer_name: IndexerOptions.Elastic,
		vectorstore_name: VectorStoreOptions.Redis,
		data_sources: [
			{
				type: 'youtube',
				target: 'https://www.youtube.com/watch?v=uvb00oaa3k8',
				metadata: {},
				parameters: {},
			},
		],
		persist_directory: 'app/vector_db',
		collection_name,
		preferred_splitter_type: SplitterTypeOptions.Recursive,
		chunk_size: 2500,
		chunk_overlap: 25,
		embed_documents: true,
		index_documents: true,
		save_loaded_documents: false,
		load_documents_from_state: false,
		load_balance_strategy: LoadBalanceStrategyOptions.RoundRobin,
	};

	console.log('Starting document ingestion...');
	const ingestResult = await sdk.aingest(ingestRequest);
	if (!ingestResult.isSuccess) {
		console.error('Ingestion failed:', ingestResult.errors);
		return;
	}
	// console.log('Ingestion initiated. Task ID:', ingestResult.response?.task_id);

	if (!ingestResult.response) {
		console.log('Unexpected Ingest Result => \n\n', ingestResult);
		return;
	}
	// const queryStateRequest: QueryIngestStateRequest = {
	// 	task_id: ingestResult.response.task_id,
	// };

	// let ingestComplete = false;
	// while (!ingestComplete) {
	// 	console.log('Checking ingest state...');
	// 	const stateResult = await sdk.queryIngestState(queryStateRequest);
	// 	if (stateResult.isSuccess) {
	// 		console.log('Current state:', stateResult.response?.current_state);
	// 		if (stateResult.response?.current_state === 'Ingestion completed successfully') {
	// 			ingestComplete = true;
	// 		}
	// 	} else {
	// 		console.error('Failed to query ingest state:', stateResult);
	// 		return;
	// 	}
	// 	if (!ingestComplete) {
	// 		await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before checking again
	// 	}
	// }

	// const retrieveRequest: RetrieveRequest = {
	// 	embedder_name: 'azure',
	// 	vectorstore_name: 'elastic',
	// 	collection_name,
	// 	search_in_vectorstore: true,
	// 	search_in_indexstore: true,
	// 	search_result_count_for_vectorstore: 3,
	// 	search_result_count_for_indexstore: 3,
	// 	query: 'What is the difference between machine learning and artificial intelligence?',
	// 	k: 5,
	// 	// use_rerank: true,
	// 	// reranker_name: 'default_reranker',
	// };

	// console.log('Retrieving relevant documents...');
	// const retrieveResult = await sdk.retrieve(retrieveRequest);
	// if (retrieveResult.isSuccess) {
	// 	console.log('Retrieved documents:');
	// 	retrieveResult.response?.calculated_relevant_documents.forEach(([doc, score], index) => {
	// 		console.log(`Document ${index + 1}:`);
	// 		console.log(`  Content: ${doc.page_content.substring(0, 100)}...`);
	// 		console.log(`  Score: ${score}`);
	// 		console.log(`  Metadata:`, doc.metadata);
	// 	});
	// } else {
	// 	console.error('Retrieval failed:', retrieveResult.errors);
	// }
}

runRAGWorkflow().catch(console.error);
