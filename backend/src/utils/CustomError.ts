export class CoustomError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // fix prototype chain for intense of work properly
    Object.setPrototypeOf(this, CoustomError.prototype);
  }
}
