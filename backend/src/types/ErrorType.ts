type Body = {
  message: string;
}

type ErrorAttributes = {
  body?: Body;
  statusCode: number;
}

export default ErrorAttributes;
