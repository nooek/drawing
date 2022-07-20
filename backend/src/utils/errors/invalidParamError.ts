import ErrorAttributes from "../../types/ErrorType"

export default class InvalidParamError extends Error {
  public body: any;
  public statusCode: number;

  constructor(props: ErrorAttributes) {
    super(`Invalid Param`)
    this.statusCode = props.statusCode ? props.statusCode : 400;
    this.body = props.body;
  }
}
