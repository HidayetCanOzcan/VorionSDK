if (typeof window !== 'undefined') {
	throw new Error('Server-side code cannot be run in a browser environment');
}
import { DaprClient } from '@dapr/dapr';

class VorionSTATE {
	private daprClient: DaprClient;
	private serviceStoreName: string;

	constructor(daprClient: DaprClient, serviceStoreName: string) {
		this.daprClient = daprClient;
		this.serviceStoreName = serviceStoreName;
	}

	async addState<T>(key: string, value: T): Promise<T> {
		const serializedValue = JSON.stringify(value);

		try {
			await this.daprClient.state.save(this.serviceStoreName, [
				{
					key: key,
					value: serializedValue,
				},
			]);
			return value;
		} catch (err) {
			console.error(`Error saving state: ${err}`);
			throw new Error('Error saving state');
		}
	}

	async getState<T>(key: string): Promise<T | null> {
		try {
			const response = await this.daprClient.state.get(this.serviceStoreName, key);
			if (!response) return null;
			return JSON.parse(response as string) as T;
		} catch (err) {
			console.error(`Error getting state: ${err}`);
			throw new Error('Error getting state');
		}
	}

	async deleteState(key: string): Promise<void> {
		try {
			await this.daprClient.state.delete(this.serviceStoreName, key);
		} catch (err) {
			console.error(`Error deleting state: ${err}`);
			throw new Error('Error deleting state');
		}
	}

	async updateState<T>(key: string, value: T): Promise<T> {
		return this.addState(key, value);
	}
}

export default VorionSTATE;
