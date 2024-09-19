export type ALoadResponse = {
	task_id: string;
	message: string;
	status: string;
	error: string | null;
	events_to_subscribe_for_notification: string[];
};
