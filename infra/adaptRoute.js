import { request, response } from "express";

const asyncWrapper =
  (fn) =>
  (req = request, res = response, next) =>
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));

export default class adaptRoute {
  static expressRoute(controller, method, args) {
    return asyncWrapper(async (req = request, res = response, next) => {
      const httpRequest = {
        body: req.body,
        files: req.files,
        headers: req.headers,
        params: req.params,
        query: req.query,
        config: {
          hostname: req.hostname,
          ip: req.ip,
          originalUrl: req.originalUrl,
          setTimeout: (ms) => req.setTimeout(ms),
          next: () => next(),
        },
      };
      const httpResponse = await controller[method](httpRequest, { ...args });
      if (httpResponse.attachment) {
        res.attachment(httpResponse.attachment);
      }
      return res.status(httpResponse.code).send(httpResponse.message);
    });
  }
}
