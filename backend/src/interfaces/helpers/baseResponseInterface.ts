export type body = {
  data?: any;
  message?: string;
};

interface BaseResponseInterface {
  statusCode: number;
  body?: body;
}

export default BaseResponseInterface;
