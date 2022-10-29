import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { AbstractExpectedError, UnExpectedError } from "../error/Error";

export function errorGenerator(err: Error): Error {
	if (err instanceof AbstractExpectedError) return err;
	else return new UnExpectedError(err);
}
