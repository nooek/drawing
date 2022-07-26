import BaseResponseI, { body } from "../../interfaces/helpers/baseResponseInterface"
export default class MissingParamError extends Error implements BaseResponseI {
  body: body;
  statusCode: number;

  constructor(body: body, statusCode: number) {
    super("Missing Param")
    this.body = body;
    this.statusCode = statusCode | 400;
  }
}
