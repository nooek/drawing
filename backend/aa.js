class BaseResponse {
  constructor(body, statusCode) {
    this.body = body
    this.statusCode = statusCode;
  }
}

class Ok extends BaseResponse {
  constructor(body, statusCode, responseData, message) {
    super(body, statusCode)
    this.statusCode = 200
    this.body.data = responseData
    this.body.message = message
  }
}

const ok = new Ok({ data: "dsada" }, "pdslapd")

console.log(ok instanceof BaseResponse)

