const { sign } = require('jsonwebtoken');
import { Request, Response } from 'express';

// Create tokens
// ----------------------------------
const createAccessToken = (email: any) => {
  return sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const createRefreshToken = (email: any) => {
  return sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

// Send tokens
// ----------------------------------
const sendAccessToken = (res: Response, req: Request, accesstoken: any) => {
  res.send({
    accesstoken,
    email: req.body.email,
  });
};

const sendRefreshToken = (res: Response, token: any) => {
  res.cookie('refreshtoken', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};

export default {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
