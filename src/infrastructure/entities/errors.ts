export class DBError extends Error {
	public status: number;
	public code: string;
	constructor(message: string) {
		super(message);
		this.code = "DB_ERROR";
		this.status = 500;
	}
}

export class AuthorizationError extends Error {
	public status: number;
	public code: string;
	constructor(message: string) {
		super(message);
		this.code = "AUTHORIZATION_ERROR";
		this.status = 401;
	}
}
