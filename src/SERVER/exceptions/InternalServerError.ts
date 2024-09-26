export class InternalServerError extends Error {
	constructor(public message: string) {
		super(message);
	}
}
