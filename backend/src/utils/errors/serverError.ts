import ErrorAttributes from "../../types/ErrorType"

export default class ServerError extends Error {
  public body: any;
  public statusCode: number;

  constructor(props: ErrorAttributes) {
    super("Server error")
    this.statusCode = props.statusCode ? props.statusCode : 500;
    this.body = props.body;
  }
}
