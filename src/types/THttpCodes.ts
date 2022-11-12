export type THTTPCodesName =
  | 'ok'
  | 'created'
  | 'badRequest'
  | 'unauthorized'
  | 'forbidden'
  | 'notFound'
  | 'unprocessableEntity'
  | 'internalServerError';

export type THTTPCodes = {
  [name in THTTPCodesName]: number;
};
