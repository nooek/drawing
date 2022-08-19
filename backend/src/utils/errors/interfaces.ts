export type body = {
  data?: any;
  message?: string;
};

interface BaseResponseI {
  statusCode: number;
  body?: body;
}

export interface BaseResponseConstructor {
  new (statusCode: number, body?: body);
}

export default BaseResponseI;
