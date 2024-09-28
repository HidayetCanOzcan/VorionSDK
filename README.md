# Vorion SDK

Vorion SDK is a comprehensive TypeScript SDK for interacting with the VORION RAG & LLM APIs. It supports both REST and WebSocket interfaces and provides an extensible solution for server-side applications.

## Features

- Interact with VORION RAG (Retrieval-Augmented Generation) API
- Interact with VORION LLM (Language Model) API
- WebSocket support for real-time communication
- TypeScript support for enhanced type safety and developer experience
- Extensible Elysia-based server creation for server-side applications
- Dapr integration for advanced distributed system capabilities
- Rich type definitions for improved code quality and autocompletion

## Installation

```bash
npm install vorion-sdk
```

## Usage

### Importing the SDK

```typescript
import { VorionRAGSDK, VorionLLMSDK, VorionWebSocket, createVorionServer } from 'vorion-sdk';
```

### RAG API Usage

```typescript
const ragSdk = new VorionRAGSDK('https://your-rag-api-base-url.com');

// Example: Embedding documents
const embedResult = await ragSdk.embed({
	documents: ['Your document content here'],
	embedder_name: EmbedderOptions.Azure,
});

// Example: Ingesting documents
const ingestResult = await ragSdk.ingest({
	data_sources: [
		{
			type: 'txt',
			target: 'path/to/your/file.txt',
			metadata: { subject: 'Example' },
			parameters: {},
		},
	],
	embedder_name: EmbedderOptions.Azure,
	vectorstore_name: VectorStoreOptions.Elastic,
	collection_name: 'your_collection_name',
	preferred_splitter_type: SplitterTypeOptions.Recursive,
});

// Example: Retrieving documents
const retrieveResult = await ragSdk.retrieve({
	embedder_name: EmbedderOptions.Azure,
	vectorstore_name: VectorStoreOptions.Elastic,
	collection_name: 'your_collection_name',
	query: 'Your search query',
	k: 5,
});
```

### LLM API Usage

```typescript
const llmSdk = new VorionLLMSDK('https://your-llm-api-base-url.com');

// Example: Making a prediction
const predictResult = await llmSdk.predict({
	conversation_state_key: 'unique_conversation_id',
	prompt: {
		text: 'Your prompt text here',
		sensitive_info: false,
	},
	llm_name: LLMOptions.OpenAI,
	llm_group_name: LLMGroupNameOptions['gpt-4'],
	memory_strategy_name: MemoryStrategyOptions.FullSummarize,
	memory_type: MemoryOptions.Redis,
	load_balancer_strategy_name: LoadBalanceStrategyOptions.DynamicWeightedRoundRobin,
});

// Example: Using Dapr for prediction
import { DaprClient } from '@dapr/dapr';

const daprClient = new DaprClient();
const predictResultWithDapr = await llmSdk.predict(
	{
		// ... prediction request parameters ...
	},
	true, // Set to true to use Dapr
	daprClient
);

// Example: Using a basic AI agent
const agentResult = await llmSdk.agentBasic({
	team_id: 'your_team_id',
	assistant_name: 'Assistant',
	assistant_sys_message: 'You are a helpful assistant.',
	task: 'Your task description',
	conversation_state_key: 'unique_conversation_id',
	llm_name: LLMOptions.OpenAI,
	llm_group_name: LLMGroupNameOptions['gpt-4'],
	load_balancer_strategy_name: LoadBalanceStrategyOptions.RoundRobin,
});
```

### WebSocket Usage

```typescript
const socket = VorionWebSocket('wss://your-websocket-url.com', 'unique-session-id.c');

socket.on(VorionEvents.PREDICTION_COMPLETE, (payload) => {
	console.log('Prediction complete:', payload);
});

socket.on(VorionEvents.INGEST_DOCUMENTS_SUCCEEDED, (payload) => {
	console.log('Document ingestion succeeded:', payload);
});
```

### Server Creation

```typescript
import { createVorionServer, DaprEvents } from 'vorion-sdk';

const { start, app } = createVorionServer({
	port: 3000,
	wsServerResponses: {
		[DaprEvents.PREDICTION_COMPLETE]: async (data) => {
			// Handle prediction completion
			return {
				event: 'custom-prediction-event',
				payload: { result: data.answer },
			};
		},
		// Other event handlers...
	},
	listenCallback: () => {
		console.log('Vorion Server started');
	},
});

// Add custom routes or logic
app.get('/custom-route', () => 'Custom route response');

// Start the server
start();
```

## API Reference

The SDK provides methods corresponding to various API endpoints:

### RAG SDK Methods

- `embed`: Embed documents or queries
- `aembed`: Asynchronous embedding
- `ingest`: Ingest documents into the vector store
- `aingest`: Asynchronous document ingestion
- `ingestMultipart`: Ingest documents using multipart form data
- `aingestMultipart`: Asynchronous multipart document ingestion
- `queryIngestState`: Query the state of an ingestion task
- `rollbackIngest`: Rollback a document ingestion
- `load`: Load documents
- `aload`: Asynchronous document loading
- `retrieve`: Retrieve relevant documents

### LLM SDK Methods

- `predict`: Make a prediction using the LLM
- `apredict`: Asynchronous prediction
- `comparePredict`: Compare predictions from different models
- `agentBasic`: Use a basic AI agent
- `agentAbasic`: Asynchronous basic AI agent
- `agentTeam`: Use a team of AI agents
- `getHistory`: Retrieve conversation history
- `getLlmConfig`: Get LLM configuration
- `getFile`: Retrieve a specific file
- `getAllFiles`: Retrieve all files for a conversation

## Key Types and Enums

The SDK includes a rich set of types and enums for better type safety and autocompletion:

### RAG Types

- `EmbedRequest`, `EmbedResponse`: Types for embedding requests and responses
- `IngestRequest`, `IngestResponse`: Types for document ingestion
- `RetrieveRequest`, `RetrieveResponse`: Types for document retrieval
- `LoadRequest`, `LoadResultModel`: Types for document loading

### LLM Types

- `PredictRequest`, `PredictResponse`: Types for LLM predictions
- `AgentBasicRequest`, `AgentBasicResponse`: Types for basic agent interactions
- `GetHistoryRequest`, `GetHistoryResponse`: Types for retrieving conversation history

### Enums

- `EmbedderOptions`: Options for embedding models (e.g., `Azure`, `OpenAI`)
- `VectorStoreOptions`: Options for vector stores (e.g., `Redis`, `Chroma`)
- `LLMOptions`: Options for language models (e.g., `Azure`, `OpenAI`, `Google`)
- `LLMGroupNameOptions`: Options for LLM group names (e.g., `gpt-4`, `claude-3-5-sonnet`)
- `LoadBalanceStrategyOptions`: Options for load balancing strategies
- `MemoryOptions`: Options for memory types (e.g., `InMemory`, `Redis`)
- `MemoryStrategyOptions`: Options for memory strategies (e.g., `FullSummarize`, `RemoveTop`)
- `SplitterTypeOptions`: Options for text splitting methods

### WebSocket Events

- `VorionEvents`: Enum of WebSocket events (e.g., `PREDICTION_COMPLETE`, `INGEST_DOCUMENTS_SUCCEEDED`)

### Server Types

- `VorionServerParams`: Type for server creation parameters
- `wsServerResponses`: Type for WebSocket server response handlers

## Error Handling

All SDK methods return a promise that resolves to an object with the following structure:

```typescript
{
  isSuccess: boolean;
  errors?: ApiError;
  response?: ResponseType;
  code: number | null;
  createdAt: Date;
}
```

Handle potential errors by checking the `isSuccess` flag and the `errors` object.

## Server Creation and Extension

The `createVorionServer` function allows you to create an Elysia-based server that can be extended to handle WebSocket events and add custom logic:

```typescript
const { start, app } = createVorionServer({
	port: 3000,
	wsServerResponses: {
		// Define event handlers here
	},
});

// Add custom routes or logic
app.get('/custom-route', () => 'Custom route response');

// Start the server
start();
```

## License

This project is licensed under the ISC License.
