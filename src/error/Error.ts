export abstract class AbstractExpectedError extends Error {
	public code: string;
	public statusCode: number;
	constructor(...args: any) {
		super(...args);
	}
}

abstract class AbstractAuthError extends AbstractExpectedError {}

export class UnExpectedError extends Error {
	code: string;
	constructor(...args: any) {
		super(...args);
		this.code = "0";
		this.name = "UnExpectedError";
		this.stack = `${this.message}\n${new Error().stack}`;
	}
}

export class NotFoundError extends AbstractExpectedError {
	constructor(...args: any) {
		super(...args);
		this.code = "1000";
		this.name = "NotFoundError";
		this.stack = `${this.message}\n${new Error().stack}`;
		this.statusCode = 404;
	}
}

export class InvalidDataError extends AbstractExpectedError {
	constructor(...args: any) {
		super(...args);
		this.code = "1001";
		this.name = "InvalidDataError";
		this.stack = `${this.message}\n${new Error().stack}`;
		this.statusCode = 400;
	}
}

export class AuthenticationError extends AbstractExpectedError {
	constructor(...args: any) {
		super(...args);
		this.code = "1002";
		this.name = "AuthenticationError";
		this.stack = `${this.message}\n${new Error().stack}`;
		this.statusCode = 401;
	}
}

export class InternalServerError extends AbstractExpectedError {
	constructor(...args: any) {
		super(...args);
		this.code = "1003";
		this.name = "InternalServerError";
		this.stack = `${this.message}\n${new Error().stack}`;
		this.statusCode = 500;
	}
}

export class PrismaClientError extends AbstractExpectedError {
	constructor(...args: any) {
		super(...args);
		this.code = "1004";
		this.name = "PrismaClientError";
		this.stack = `${this.message}\n${new Error().stack}`;
		this.statusCode = 500;
	}
}

export class IssueImageExifError extends AbstractExpectedError {
	constructor(...args: any) {
		super(...args);
		this.code = "1005";
		this.name = "IssueImageExifError";
		this.stack = `${this.message}\n${new Error().stack}`;
		this.statusCode = 500;
	}
}

export class IssueCreateError extends AbstractExpectedError {
	constructor(...args: any) {
		super(...args);
		this.code = "1006";
		this.name = "IssueCreateError";
		this.stack = `${this.message}\n${new Error().stack}`;
		this.statusCode = 500;
	}
}
