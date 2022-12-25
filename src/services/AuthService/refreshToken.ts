import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import response from '@utils/response';
import httpCodes from '@utils/httpCodes';
const { compare } = require('bcryptjs');
const { verify } = require('jsonwebtoken');
import tokens from './tokens';
import isAuth from './isAuth';

const prisma = new PrismaClient();

const refreshTokenAdmin = async (req: Request, res: Response) => {
  const token = req.cookies.refreshtoken;
  if (!token) return res.send({ accesstoken: '' });
  let payload: any = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }

  const user = await prisma.admin.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user || user.refreshToken !== token) {
    try {
      await prisma.admin.update({
        where: {
          email: payload.email,
        },
        data: {
          refreshToken: '',
        },
      });
    } catch (error: any) {
      return response(res, httpCodes.internalServerError, error.message, null);
    }
  }

  if (user) {
    const accessToken = tokens.createAccessToken(user.email);
    const refreshToken = tokens.createRefreshToken(user.email);

    user.refreshToken = refreshToken;

    tokens.sendRefreshToken(res, refreshToken);
    return res.send({ accessToken });
  }
};

const refreshTokenPatient = async (req: Request, res: Response) => {
  const token = req.cookies.refreshtoken;
  if (!token) return res.send({ accesstoken: '' });
  let payload: any = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }

  const user = await prisma.admin.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user || user.refreshToken !== token) {
    try {
      await prisma.patient.update({
        where: {
          email: payload.email,
        },
        data: {
          refreshToken: '',
        },
      });
    } catch (error: any) {
      return response(res, httpCodes.internalServerError, error.message, null);
    }
  }

  if (user) {
    const accessToken = tokens.createAccessToken(user.email);
    const refreshToken = tokens.createRefreshToken(user.email);

    user.refreshToken = refreshToken;

    tokens.sendRefreshToken(res, refreshToken);
    return res.send({ accessToken });
  }
};

const refreshTokenDoctor = async (req: Request, res: Response) => {
  const token = req.cookies.refreshtoken;
  if (!token) return res.send({ accesstoken: '' });
  let payload: any = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }

  const user = await prisma.doctor.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user || user.refreshToken !== token) {
    try {
      await prisma.patient.update({
        where: {
          email: payload.email,
        },
        data: {
          refreshToken: '',
        },
      });
    } catch (error: any) {
      return response(res, httpCodes.internalServerError, error.message, null);
    }
  }

  if (user) {
    const accessToken = tokens.createAccessToken(user.email);
    const refreshToken = tokens.createRefreshToken(user.email);

    user.refreshToken = refreshToken;

    tokens.sendRefreshToken(res, refreshToken);
    return res.send({ accessToken });
  }
};

export default { refreshTokenAdmin, refreshTokenPatient, refreshTokenDoctor };
