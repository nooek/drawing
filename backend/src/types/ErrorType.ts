type Body = {
  paramName?: string;
  message: string;
}

type ErrorAttributes = {
  body: Body;
  statusCode: number;
}

export default ErrorAttributes;
