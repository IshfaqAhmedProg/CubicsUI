import { apiRes } from "./apiRes";

export class RAPIResponse {
  private static ar = apiRes;

  private static jsonResponse(
    status: number,
    message: Record<string, any> | string,
  ) {
    return Response.json(typeof message === "string" ? { message } : message, {
      status,
    });
  }

  static error(error: unknown, message?: string): Response {
    const errMssgs = message ? [message] : [];

    if (Array.isArray(error)) {
      error.forEach((e) => {
        console.error(e);
        if (e instanceof Error) errMssgs.push(e.message);
      });
    }

    if (error instanceof Error) {
      errMssgs.push(error.message);
    }

    return this.jsonResponse(400, this.ar.error(errMssgs.join("\n")));
  }

  static unauthorised(): Response {
    return this.jsonResponse(401, this.ar.unauthorised);
  }

  static forbidden(): Response {
    return this.jsonResponse(403, this.ar.forbidden);
  }

  static missingParams(param: string | string[]): Response {
    return this.jsonResponse(400, this.ar.missingParams(param));
  }

  static notFound(item: string): Response {
    return this.jsonResponse(404, this.ar.notFound(item));
  }

  static itemAlreadyExists(item: string): Response {
    return this.jsonResponse(409, this.ar.alreadyExists(item));
  }

  static success(obj: Record<string, any> | any[]): Response {
    return this.jsonResponse(200, obj);
  }

  static wrongType(item: string): Response {
    return this.jsonResponse(422, this.ar.wrongType(item));
  }

  static contentTooLarge(content: string, maxSize?: string): Response {
    return this.jsonResponse(413, this.ar.contentTooLarge(content, maxSize));
  }
}
