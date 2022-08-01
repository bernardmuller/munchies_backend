import { Router, Request, Response, NextFunction } from 'express';
import { authenticateUser } from '../shared/utils';

type Endpoint = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  handler: (req: Request, res: Response) => void;
  authenticate: boolean;
};

export const catchAsync = (
  func: (req: Request, res: Response, next: NextFunction) => any,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };
};

export const createEndpoint = (router: Router, endpoint: Endpoint) => {
  let middleware = endpoint.authenticate ? [authenticateUser] : [];
  const routeMiddleware = middleware.map((ware) => catchAsync(ware));
  router[endpoint.method](
    endpoint.path,
    ...routeMiddleware,
    catchAsync(endpoint.handler),
  );
};
