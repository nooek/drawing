import { Request, Response } from "express"

export default class HttpAdapter {
  private controller;

  constructor(controller: any) {
    this.controller = controller;
  }

  adapt() {
    return (req: Request, res: Response) => {
      const httpRequest = {
        body: req.body,
        params: req.params,
        req: req,
      };
      this.controller
        .route(httpRequest)
        .then((httpResponse: any) => {
          res.status(httpResponse.statusCode).json(httpResponse.body);
        })
        .catch((e: Error) => res.status(500).json({ 
          errorMsg: "An error occurred.",
          error: e
        }));
    };
  }
}
