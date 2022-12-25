import { Request, Response } from 'express';
const { verify } = require('jsonwebtoken');

const isAuth = (req: Request) => {
  const authorization = req.headers['authorization'];
  if (!authorization) throw new Error('You need to login.');
  // Based on 'Bearer ksfljrewori384328289398432'
  const token = authorization.split(' ')[1];
  const { email } = verify(token, process.env.ACCESS_TOKEN_SECRET);
  return email;
};

export default isAuth;
