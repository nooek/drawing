type body = {
  data?: any;
  message?: string;
}

export default class BaseResponse {
  protected body: body;
  protected statusCode: number;

  constructor(body: body, statusCode: number) {
    this.body = body;
    this.statusCode = statusCode;
  }
}
