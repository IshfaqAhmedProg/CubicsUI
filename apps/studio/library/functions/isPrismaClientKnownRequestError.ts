import { Prisma } from "@cubicsui/db";

/**
 * Hack for a bug in PrismaClientKnownRequestError that prevents instanceof checks
 * https://github.com/prisma/prisma/issues/12128
 * @param error Any kind of actual error, object or otherwise
 * @returns Boolean indicating whether the error is a PrismaClientKnownRequestError
 */
export function isPrismaClientKnownRequestError(
  error: any
): error is Prisma.PrismaClientKnownRequestError {
  return error.constructor.name === Prisma.PrismaClientKnownRequestError.name;
}
