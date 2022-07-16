import ErrorAttributes from "../../types/ErrorType"

export default class MissingParamError extends Error {
  public body: any;
  public statusCode: number;

  constructor(props: ErrorAttributes) {
    super(`Missing Param: ${props.body.paramName ? props.body.paramName : ""}`)
    this.statusCode = props.statusCode ? props.statusCode : 400;
    this.body = props.body;
  }
}
