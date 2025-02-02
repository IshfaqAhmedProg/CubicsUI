import { Prisma } from "@cubicsui/db";

/**
 * Checks if the error is a document exists error
 * @param error Error object in catch block
 * @returns Returns true if error is a document exists error
 */
export function isDocumentNotFoundError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  );
}
