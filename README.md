# Vorion SDK

Vorion SDK is a comprehensive TypeScript SDK for interacting with VORION RAG & LLM APIs. It supports both REST APIs and WebSocket interfaces for real-time communication.

## Features

- Extensive support for RAG (Retrieval-Augmented Generation) operations
- Wide range of API endpoints for LLM (Large Language Model) interactions
- WebSocket support for real-time event handling
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

To use Vorion SDK in your project, first import it and create instances:

```typescript
import { VorionRAGSDK, VorionLLMSDK, VorionWebSocket } from 'vorion-sdk';

const ragSdk = new VorionRAGSDK('https://your-rag-api-base-url.com');
const llmSdk = new VorionLLMSDK('https://your-llm-api-base-url.com');
const socket = VorionWebSocket('wss://your-websocket-url.com', 'your-session-id');
```

## RAG (Retrieval-Augmented Generation) Functions

Vorion SDK provides a comprehensive set of functions for RAG operations:

| Function           | Description                                                           |
| ------------------ | --------------------------------------------------------------------- |
| `embed`            | Converts documents or queries into embedding vectors                  |
| `aembed`           | Initiates an asynchronous embedding process                           |
| `ingest`           | Processes documents and adds them to the vector store                 |
| `aingest`          | Starts an asynchronous document processing and ingestion              |
| `ingestMultipart`  | Performs document processing and ingestion with multipart data upload |
| `aingestMultipart` | Initiates an asynchronous multipart data upload process               |
| `queryIngestState` | Queries the state of an ingestion operation                           |
| `rollbackIngest`   | Reverts an ingestion operation                                        |
| `load`             | Loads documents                                                       |
| `aload`            | Initiates an asynchronous document loading process                    |
| `retrieve`         | Fetches relevant documents                                            |

## LLM (Large Language Model) Functions

The SDK offers various functions for interacting with Large Language Models:

| Function         | Description                                      |
| ---------------- | ------------------------------------------------ |
| `predict`        | Obtains a prediction from the LLM                |
| `apredict`       | Initiates an asynchronous LLM prediction         |
| `getHistory`     | Retrieves chat history                           |
| `getLlmConfig`   | Obtains the LLM configuration                    |
| `comparePredict` | Compares predictions from different LLMs         |
| `agentBasic`     | Runs a basic AI agent                            |
| `agentAbasic`    | Initiates an asynchronous basic AI agent process |
| `agentTeam`      | Runs a team of AI agents                         |
| `getFile`        | Downloads a specific file                        |
| `getAllFiles`    | Downloads all files as a ZIP                     |

## WebSocket Support

Vorion SDK now includes WebSocket support for real-time communication and event handling. This is particularly useful for scenarios requiring asynchronous operations and instant updates.

**Note:** The WebSocket functionality is currently in its initial implementation. The type definitions for WebSocket events and payloads are not yet fully type-safe. We plan to improve and complete these types in future versions of the SDK to provide a more robust and type-safe experience.

### Connecting to WebSocket

```typescript
import { VorionWebSocket, VorionEvents } from 'vorion-sdk';

const socket = VorionWebSocket('wss://your-websocket-url.com', 'your-session-id');
```

### Handling Vorion Events

```typescript
socket.on(VorionEvents.PREDICTION_COMPLETE, (payload) => {
	console.log('Prediction complete:', payload);
});

socket.on(VorionEvents.INGEST_DOCUMENTS_SUCCEEDED, (payload) => {
	console.log('Document ingestion succeeded:', payload);
});

// ... handle other events as needed
```

### Closing the WebSocket Connection

```typescript
socket.close();
```

## Examples

For more detailed examples and use cases, please refer to the `examples` folder in this repository. These examples cover various scenarios and demonstrate how to use different features of the Vorion SDK effectively, including the new WebSocket functionality.

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

- **Enhanced WebSocket Support**: We plan to expand our WebSocket capabilities, including support for custom events and improved error handling. This will include completing and refining the type definitions for WebSocket events and payloads to provide a fully type-safe experience.
- **Real-time Collaboration**: Implement features that leverage WebSockets for real-time collaboration between multiple users or agents.

## License

This project is licensed under the ISC License. See the `LICENSE` file for more information.
