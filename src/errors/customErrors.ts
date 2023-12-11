class IError extends Error {
  public constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, IError.prototype);
  }
}

class CustomError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 400;
  }
}

class InvalidParameterError extends CustomError {
  status: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 422;
  }
}

class DuplicateUserError extends CustomError {
  status: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = 409;
  }
}

export { IError, CustomError, InvalidParameterError, DuplicateUserError };
