// import ErrorAttributes from "../../../types/ErrorType"

// type Body = {
//   error: string;
//   message: string;
// }

// type Response = {
//   body: Body;
//   statusCode: number;
// }

// export default function createError(props: ErrorAttributes, errorType: string): Response{
//   return {
//     body: {
//       error: `${errorType} error: ${props.paramName}`,
//       message: props.message,
//     },
//     statusCode: props.statusCode
//   }
// }
