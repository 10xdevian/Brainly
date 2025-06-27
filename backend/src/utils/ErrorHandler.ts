interface CoustomError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
}
export class ErrorHandler extends Error implements CoustomError {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fails" : "Error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
