export class DBError extends Error {
	public status: string;
	public code: number;
	constructor(message: string) {
		super(message);
		this.status = "DB_ERROR";
		this.code = 500;
	}
}
