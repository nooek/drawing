import BaseResponseI, { body } from "../../interfaces/helpers/baseResponseInterface"

export default class UnauthorizedError extends Error implements BaseResponseI {
  body: body;
  statusCode: number;

  constructor(body: body, statusCode: number) {
    super("Unauthorized Error")
    this.body = body;
    this.statusCode = statusCode | 400;
  }
}
