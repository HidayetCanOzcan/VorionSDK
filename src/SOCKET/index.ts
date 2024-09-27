import { EventEmitter } from 'events';
import { VorionEventHandlers, VorionEvents } from './types';
class VorionWebSocketManager extends EventEmitter {
	private static instance: VorionWebSocketManager | null = null;
	private socket: WebSocket | null = null;
	private sessionId: string;
	private baseUrl: string;
	private reconnectAttempts = 0;
	private maxReconnectAttempts = 5;
	private reconnectInterval = 5000;

	private constructor(baseUrl: string, sessionId: string) {
		super();
		this.baseUrl = baseUrl;
		this.sessionId = sessionId;
		this.initializeSocket();
	}

	static getInstance(baseUrl: string, sessionId: string): VorionWebSocketManager {
		if (!VorionWebSocketManager.instance) {
			VorionWebSocketManager.instance = new VorionWebSocketManager(baseUrl, sessionId);
		} else if (VorionWebSocketManager.instance.baseUrl !== baseUrl || VorionWebSocketManager.instance.sessionId !== sessionId) {
			VorionWebSocketManager.instance.close();
			VorionWebSocketManager.instance = new VorionWebSocketManager(baseUrl, sessionId);
		}
		return VorionWebSocketManager.instance;
	}

	private initializeSocket() {
		this.socket = new WebSocket(`${this.baseUrl}/ws?session=${this.sessionId}`);

		this.socket.onopen = () => {
			console.log('WebSocket connected');
			this.reconnectAttempts = 0;
			this.emit('connected');
		};

		this.socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			if (Object.values(VorionEvents).includes(message.event as VorionEvents)) {
				this.emit(message.event, message.payload);
				this.sendAck(message.ackId);
			}
		};

		this.socket.onclose = () => {
			console.log('WebSocket disconnected');
			this.emit('disconnected');
			this.reconnect();
		};

		this.socket.onerror = (error) => {
			console.error('WebSocket error:', error);
			this.emit('error', error);
		};
	}

	private reconnect() {
		if (this.reconnectAttempts < this.maxReconnectAttempts) {
			this.reconnectAttempts++;
			console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
			setTimeout(() => this.initializeSocket(), this.reconnectInterval);
		} else {
			console.error('Max reconnection attempts reached');
			this.emit('max_reconnect_attempts');
		}
	}

	private sendAck(ackId: number) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify({ event: 'acknowledge', ackId }));
		}
	}

	on<K extends keyof VorionEventHandlers>(event: K, listener: VorionEventHandlers[K]): this {
		return super.on(event, listener);
	}

	close() {
		if (this.socket) {
			this.socket.close();
		}
	}
}

export default function VorionWebSocket(baseUrl: string, sessionId: string): VorionWebSocketManager {
	return VorionWebSocketManager.getInstance(baseUrl, sessionId);
}
