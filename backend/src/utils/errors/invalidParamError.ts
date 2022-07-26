import BaseResponseI, { body } from "../../interfaces/helpers/baseResponseInterface"
export default class InvalidParamError extends Error implements BaseResponseI {
  body: body;
  statusCode: number;

  constructor(body: body, statusCode: number) {
    super("Invalid Param")
    this.body = body;
    this.statusCode = statusCode | 400;
  }
}
