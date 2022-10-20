import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { InvalidDataError, PrismaClientError } from "../error/Error";

export function errorFactory(err: Error): Error {
	if (err instanceof TypeError) return new InvalidDataError(err);
	if (err instanceof PrismaClientValidationError) return new InvalidDataError(err);
	if (err instanceof PrismaClientKnownRequestError) return new PrismaClientError(err);
	return err;
}
