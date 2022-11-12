import { THTTPCodes } from '../types/THttpCodes';

const httpCodes: THTTPCodes = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
};

export default httpCodes;
