import { Request, Response } from "express";

export default class HttpAdapter {
  private controller;

  constructor(controller: any) {
    this.controller = controller;
  }

  adapt(extraParams?: any) {
    return (req: Request, res: Response) => {
      const request = {
        body: req.body,
        params: req.params,
        req: req,
        extraParams: extraParams
      };
      this.controller
        .route(request)
        .then((httpResponse: any) => {
          res.status(httpResponse.statusCode).json(httpResponse.body);
        })
        .catch((e: Error) => {
          console.log(e)
          res.status(500).json({
            errorMsg: "An error occurred.",
            error: e,
          })
        })
    };
  }
}
