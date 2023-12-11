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

export { IError, CustomError };
