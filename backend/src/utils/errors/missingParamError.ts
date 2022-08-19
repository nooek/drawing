import BaseResponseI, { body } from "../../interfaces/helpers/baseResponseInterface"

export default class MissingParamError extends Error implements BaseResponseI {
  body: body;
  statusCode: number;

  constructor(statusCode: number, body: body) {
    super("Missing Param")
    this.body = body;
    this.statusCode = statusCode | 400;
  }
}
