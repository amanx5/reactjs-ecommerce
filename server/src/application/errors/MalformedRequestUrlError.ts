import { InvalidRequestError } from "@/application/errors/";

export class MalformedRequestUrlError extends InvalidRequestError {
  public message: string = "Malformed Request URL";

  constructor(msg?: string) {
    super();

    if (msg) {
      this.message = msg;
    }
  }
}
