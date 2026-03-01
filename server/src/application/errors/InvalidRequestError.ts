export class InvalidRequestError extends Error {
  public message: string = "Invalid Request";

  constructor(msg?: string) {
    super();

    if (msg) {
      this.message = msg;
    }
  }
}
