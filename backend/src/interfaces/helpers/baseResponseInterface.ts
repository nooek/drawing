export type body = {
  data?: any;
  message?: string;
};

interface BaseResponseI {
  statusCode: number;
  body?: body;
}

export interface MatchConstructor {
  new (statusCode: number, body?: body);
}

export default BaseResponseI;
