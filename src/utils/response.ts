import { Response } from 'express';

const response = (
  res: Response,
  statusCode: number,
  message: string,
  data: any
) =>
  res.status(statusCode).json({
    code: statusCode,
    status: statusCode < 400 ? 'Success' : 'Failed',
    message,
    data,
  });

export default response;
