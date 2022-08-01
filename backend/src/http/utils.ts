import { Router, Request, Response, NextFunction } from 'express';
import { authenticateUser } from '../shared/utils';
import path from 'path';
import { router } from './routes';

type Endpoint = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  handler: (req: Request, res: Response) => void;
  authenticate: boolean;
};

export const catchAsync = (func: (req: any, res: any, next: any) => any) => {
  return (req: any, res: any, next: any) => {
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

export const getSourceFolderfromCurrentDirectory = (dir: string) => {
  const [backendDir] = dir.split('/src');
  return `${backendDir}/src`;
};
