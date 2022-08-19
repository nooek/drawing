import BaseResponseI, { body } from "./interfaces"
export default class InvalidParamError extends Error implements BaseResponseI {
  body: body;
  statusCode: number;

  constructor(statusCode: number, body: body) {
    super("Invalid Param")
    this.body = body;
    this.statusCode = statusCode | 400;
  }
}
