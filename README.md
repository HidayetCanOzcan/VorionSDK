# Vorion SDK

Vorion SDK is a comprehensive TypeScript SDK for interacting with VORION RAG & LLM APIs. It currently supports REST APIs, with plans for WebSocket interface support in the future.

## Features

- Extensive support for RAG (Retrieval-Augmented Generation) operations
- Wide range of API endpoints for LLM (Large Language Model) interactions
- Full TypeScript support with robust type definitions
- High-level abstraction for ease of use
- Custom `CustomFetch` implementation for error handling and logging
- Asynchronous operations support for long-running tasks
- Multipart file upload capabilities

## Installation

You can add Vorion SDK to your project using npm:

```bash
npm install vorion-sdk
```

## Usage

To use Vorion SDK in your project, first import it and create an instance:

```typescript
import { VorionRAGSDK, VorionLLMSDK } from 'vorion-sdk';

const ragSdk = new VorionRAGSDK('https://your-rag-api-base-url.com');
const llmSdk = new VorionLLMSDK('https://your-llm-api-base-url.com');
```

## RAG (Retrieval-Augmented Generation) Functions

Vorion SDK provides a comprehensive set of functions for RAG operations:

| Function           | Description                                                           | Use Case                                                |
| ------------------ | --------------------------------------------------------------------- | ------------------------------------------------------- |
| `embed`            | Converts documents or queries into embedding vectors                  | When you need to create vector representations of text  |
| `aembed`           | Initiates an asynchronous embedding process                           | For large-scale embedding tasks that may take time      |
| `ingest`           | Processes documents and adds them to the vector store                 | When ingesting new documents into your knowledge base   |
| `aingest`          | Starts an asynchronous document processing and ingestion              | For ingesting large volumes of documents                |
| `ingestMultipart`  | Performs document processing and ingestion with multipart data upload | When ingesting documents along with metadata files      |
| `aingestMultipart` | Initiates an asynchronous multipart data upload process               | For large-scale, multipart document ingestion           |
| `queryIngestState` | Queries the state of an ingestion operation                           | To check the progress of an asynchronous ingestion task |
| `rollbackIngest`   | Reverts an ingestion operation                                        | When you need to undo a recent document ingestion       |
| `load`             | Loads documents                                                       | For retrieving documents from your data source          |
| `aload`            | Initiates an asynchronous document loading process                    | When loading large volumes of documents                 |
| `retrieve`         | Fetches relevant documents                                            | For finding documents related to a given query          |

## LLM (Large Language Model) Functions

The SDK offers various functions for interacting with Large Language Models:

| Function         | Description                                      | Use Case                                                |
| ---------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `predict`        | Obtains a prediction from the LLM                | When you need a quick response from the model           |
| `apredict`       | Initiates an asynchronous LLM prediction         | For longer, more complex queries that may take time     |
| `getHistory`     | Retrieves chat history                           | When you need to review or analyze past interactions    |
| `getLlmConfig`   | Obtains the LLM configuration                    | To check or verify the current LLM settings             |
| `comparePredict` | Compares predictions from different LLMs         | When evaluating multiple models for a task              |
| `agentBasic`     | Runs a basic AI agent                            | For simple task automation or decision-making           |
| `agentAbasic`    | Initiates an asynchronous basic AI agent process | For longer-running automated tasks                      |
| `agentTeam`      | Runs a team of AI agents                         | For complex tasks requiring multiple specialized agents |
| `getFile`        | Downloads a specific file                        | When you need to retrieve a particular document         |
| `getAllFiles`    | Downloads all files as a ZIP                     | For bulk document retrieval                             |

## Examples

You can find more detailed examples in the `examples` folder of this repository. Here are a few quick examples to get you started:

### RAG Operation Example

```typescript
const ingestResult = await ragSdk.aingest({
	data_sources: [
		{
			type: 'txt',
			target: 'path/to/file.txt',
			metadata: { subject: 'AI basics' },
			parameters: {},
		},
	],
	embedder_name: 'azure',
	vectorstore_name: 'elastic',
	collection_name: 'ai_documents',
	embed_documents: true,
	index_documents: true,
});

console.log('Ingestion task ID:', ingestResult.response?.task_id);

// Query ingestion state
const stateResult = await ragSdk.queryIngestState({ task_id: ingestResult.response?.task_id });
console.log('Ingestion state:', stateResult.response?.current_state);

// Retrieve relevant documents
const retrieveResult = await ragSdk.retrieve({
	embedder_name: 'azure',
	vectorstore_name: 'elastic',
	collection_name: 'ai_documents',
	search_in_vectorstore: true,
	search_in_indexstore: true,
	query: 'What is machine learning?',
	k: 5,
});

console.log('Retrieved documents:', retrieveResult.response?.calculated_relevant_documents);
```

### LLM Prediction Example

```typescript
const predictResult = await llmSdk.predict({
	conversation_state_key: 'unique_conversation_id',
	prompt: {
		text: 'Explain the concept of neural networks in simple terms.',
		sensitive_info: false,
	},
	llm_name: 'gpt-3.5-turbo',
	load_balancer_strategy_name: 'default',
});

console.log('LLM response:', predictResult.response?.answer);

// Compare predictions from different models
const compareResult = await llmSdk.comparePredict({
	conversation_state_key: 'unique_conversation_id',
	prompt: {
		text: 'What are the ethical implications of AI?',
		sensitive_info: false,
	},
	llm_name: 'gpt-3.5-turbo',
	load_balancer_strategy_name: 'default',
});

console.log('Comparison results:', compareResult.response);
```

## Error Handling

Vorion SDK uses a `CustomFetch` implementation that provides detailed error information. All SDK functions return a `CustomFetchReturnType` object, which includes an `isSuccess` flag, `errors` object (if any), and the `response` data.

```typescript
const result = await ragSdk.embed({...});
if (!result.isSuccess) {
  console.error('Error occurred:', result.errors);
} else {
  console.log('Embedding successful:', result.response);
}
```

## Advanced Usage

### Asynchronous Operations

For long-running tasks, use the asynchronous versions of functions (prefixed with 'a'). These functions return a task ID, which you can use to query the operation state:

```typescript
const aingestResult = await ragSdk.aingest({...});
const taskId = aingestResult.response?.task_id;

// Poll for completion
let isComplete = false;
while (!isComplete) {
  const stateResult = await ragSdk.queryIngestState({ task_id: taskId });
  if (stateResult.response?.current_state === 'Ingestion completed successfully') {
    isComplete = true;
  }
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before next poll
}
```

### Multipart File Upload

For ingesting documents along with metadata, use the `ingestMultipart` or `aingestMultipart` functions:

```typescript
const file = new File(['file contents'], 'document.txt', { type: 'text/plain' });
const metadata = JSON.stringify({
	indexer_name: 'default_indexer',
	embedder_name: 'azure',
	vectorstore_name: 'elastic',
	collection_name: 'my_collection',
});

const result = await ragSdk.ingestMultipart({
	data: metadata,
	files: [file],
});
```

## Future Features

- **WebSocket Support**: We plan to add WebSocket support for real-time communication and long-running operations. This will be particularly useful for scenarios requiring asynchronous operations and instant updates.

## Examples

For more detailed examples and use cases, please refer to the `examples` folder in this repository. These examples cover various scenarios and demonstrate how to use different features of the Vorion SDK effectively.

## License

This project is licensed under the ISC License. See the `LICENSE` file for more information.
