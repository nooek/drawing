import ErrorAttributes from "../../../types/ErrorType"

type Response = {
  error: string;
  messageToClient: string;
  statusCode: number;
}

export default function createError(props: ErrorAttributes, errorType: string): Response{
  return {
    error: `${errorType} error: ${props.paramName}`,
    messageToClient: props.messageToClient,
    statusCode: props.statusCode
  }
}
