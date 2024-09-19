import VorionRAGSDK from '../RAG';
import { QueryIngestStateRequest } from '../RAG/methods/ingest-query-state/types';
import { IngestRequest } from '../RAG/methods/ingest/types';
import { RetrieveRequest } from '../RAG/methods/retrieve/types';
import * as fs from 'fs/promises';
import * as path from 'path';

async function createSampleTextFile(): Promise<string> {
	const content = `
Artificial Intelligence and Machine Learning

Artificial Intelligence (AI) is a broad field of computer science focused on creating intelligent machines that can perform tasks that typically require human intelligence. These tasks include visual perception, speech recognition, decision-making, and language translation.

Machine Learning (ML) is a subset of AI that focuses on the development of algorithms and statistical models that enable computer systems to improve their performance on a specific task through experience. Instead of explicitly programming rules, machine learning systems can learn from data.

Key differences between AI and ML:
1. Scope: AI is a broader concept aiming to create intelligent machines, while ML is a specific approach to achieve AI.
2. Functionality: AI systems can make decisions, while ML systems learn patterns from data.
3. Goal: The goal of AI is to increase the chances of success, not accuracy, while ML specifically aims to increase accuracy of a model.

Both AI and ML are crucial in today's technological landscape, driving innovations in various fields such as healthcare, finance, and autonomous vehicles.
    `;

	const fileName = 'ai_ml_intro.txt';
	await fs.writeFile(fileName, content);
	return path.resolve(fileName);
}

async function runRAGWorkflow() {
	console.log(process.env.NODE_TLS_REJECT_UNAUTHORIZED);
	if (!process.env.RAG_HOST) {
		console.log('Please create .env file and put a varible with name RAG_HOST.');
		return;
	}
	const sdk = new VorionRAGSDK(process.env.RAG_HOST);

	// Step 1: Create a sample text file
	console.log('Creating sample text file...');
	const filePath = await createSampleTextFile();
	console.log('Sample file created:', filePath);

	const collection_name = `doc_${Math.random().toString(36)}`;

	// Step 2: Ingest document
	const ingestRequest: IngestRequest = {
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

	console.log('Starting document ingestion...');
	const ingestResult = await sdk.aingest(ingestRequest);
	if (!ingestResult.isSuccess) {
		console.error('Ingestion failed:', ingestResult.errors);
		return;
	}
	console.log('Ingestion initiated. Task ID:', ingestResult.response?.task_id);

	if (!ingestResult.response) {
		console.log('Unexpected Ingest Result => \n\n', ingestResult);
		return;
	}

	// Step 2: Query ingest state
	const queryStateRequest: QueryIngestStateRequest = {
		task_id: ingestResult.response.task_id,
	};

	let ingestComplete = false;
	while (!ingestComplete) {
		console.log('Checking ingest state...');
		const stateResult = await sdk.queryIngestState(queryStateRequest);
		if (stateResult.isSuccess) {
			console.log('Current state:', stateResult.response?.current_state);
			if (stateResult.response?.current_state === 'Ingestion completed successfully') {
				ingestComplete = true;
			}
		} else {
			console.error('Failed to query ingest state:', stateResult.errors);
			return;
		}
		if (!ingestComplete) {
			await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before checking again
		}
	}

	// Step 3: Retrieve relevant documents
	const retrieveRequest: RetrieveRequest = {
		embedder_name: 'azure',
		vectorstore_name: 'elastic',
		collection_name,
		search_in_vectorstore: true,
		search_in_indexstore: true,
		search_result_count_for_vectorstore: 3,
		search_result_count_for_indexstore: 3,
		query: 'What is the difference between machine learning and artificial intelligence?',
		k: 5,
		// use_rerank: true,
		// reranker_name: 'default_reranker',
	};

	console.log('Retrieving relevant documents...');
	const retrieveResult = await sdk.retrieve(retrieveRequest);
	if (retrieveResult.isSuccess) {
		console.log('Retrieved documents:');
		retrieveResult.response?.calculated_relevant_documents.forEach(([doc, score], index) => {
			console.log(`Document ${index + 1}:`);
			console.log(`  Content: ${doc.page_content.substring(0, 100)}...`);
			console.log(`  Score: ${score}`);
			console.log(`  Metadata:`, doc.metadata);
		});
	} else {
		console.error('Retrieval failed:', retrieveResult.errors);
	}
}

runRAGWorkflow().catch(console.error);
