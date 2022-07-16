import ErrorAttributes from "../../types/ErrorType"

export default class UnauthorizedError extends Error {
  public body: any;
  public statusCode: number;

  constructor(props: ErrorAttributes) {
    super("Unauthorized error")
    this.statusCode = props.statusCode ? props.statusCode : 403;
    this.body = props.body;
  }
}
