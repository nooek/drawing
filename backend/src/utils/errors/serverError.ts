import BaseResponseI, { body } from "../../interfaces/helpers/baseResponseInterface"

export default class ServerError extends Error implements BaseResponseI {
  body: body = { message: "An error occured. "};
  statusCode: number;

  constructor(statusCode: number) {
    super("Server error")
    this.statusCode = statusCode | 500;
  }
}
