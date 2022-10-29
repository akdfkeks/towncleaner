export abstract class AbstractExpectedError extends Error {
	public code: string;
	public statusCode: number;
	constructor(...args: any) {
		super(...args);
	}
}

export class UnExpectedError extends Error {
	code: string;
	statusCode: number;
	constructor(...args: any) {
		super(...args);
		this.code = "0";
		this.name = "UnExpectedError";
		this.stack = `${this.message}\n${new Error().stack}`;
		this.statusCode = 500;

		this.printError();
	}

	private printError() {
		console.log("UnExpected Error");
		console.log(this.message);
		console.log(this.stack);
	}
}

export class NotFoundError extends AbstractExpectedError {
	constructor(...args: any) {
		super(...args);
		this.code = "1000";
		this.name = "NotFoundError";
		this.message = "페이지를 찾을 수 없습니다.";
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

export class PermissionError extends AbstractExpectedError {
	constructor(...args: any) {
		super(...args);
		this.code = "1002";
		this.name = "PermissionError";
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
		this.printError();
	}

	private printError() {
		console.log("Internal Server Error");
		console.log(this.message);
		console.log(this.stack);
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
