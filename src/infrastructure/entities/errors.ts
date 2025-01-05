export class DBError extends Error {
	public status: string;
	public code: number;
	constructor(message: string) {
		super(message);
		this.status = "DB_ERROR";
		this.code = 500;
	}
}

export class AuthorizationError extends Error {
	public status: string;
	public code: number;
	constructor(message: string) {
		super(message);
		this.status = "AUTHORIZATION_ERROR";
		this.code = 401;
	}
}
