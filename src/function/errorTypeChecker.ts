import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import {
	AbstractExpectedError,
	InvalidDataError,
	IssueImageExifError,
	PrismaClientError,
	UnExpectedError,
} from "../error/Error";

export function errorFactory(err: Error): Error {
	if (err instanceof TypeError) return new InvalidDataError(err);
	//if (err instanceof PrismaClientValidationError) return new InvalidDataError(err);
	//if (err instanceof PrismaClientKnownRequestError) return new PrismaClientError(err);
	if (err instanceof AbstractExpectedError) return err;
	return new UnExpectedError(err);
}
