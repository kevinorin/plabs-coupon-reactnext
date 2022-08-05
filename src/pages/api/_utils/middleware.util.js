import { NextApiRequest, NextApiResponse } from "next";

/**
 * Run middleware against a NextJS API request
 *
 * @param req        - API request
 * @param res        - API response
 * @param middleware - Middleware function
 */
const runMiddleware = (
  req,
  res,
  middleware) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      return result instanceof Error ? reject(result) : resolve(result);
    });
  });
};

export { runMiddleware };
