import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import response from '@utils/response';
import httpCodes from '@utils/httpCodes';
import isAuth from './isAuth';

const prisma = new PrismaClient();

const logoutAdmin = async (req: Request, res: Response) => {
  res.clearCookie('refreshtoken', { path: '/refresh_token' });

  const userEmail = isAuth(req);

  try {
    const user = await prisma.admin.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (user) {
      try {
        await prisma.admin.update({
          where: {
            email: userEmail,
          },
          data: {
            refreshToken: '',
          },
        });
      } catch (error: any) {
        return response(
          res,
          httpCodes.internalServerError,
          error.message,
          null
        );
      }
    }
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
  return res.send({
    message: 'Logged out',
  });
};

const logoutPatient = async (req: Request, res: Response) => {
  res.clearCookie('refreshtoken', { path: '/refresh_token' });

  const userEmail = isAuth(req);

  try {
    const user = await prisma.patient.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (user) {
      try {
        await prisma.patient.update({
          where: {
            email: userEmail,
          },
          data: {
            refreshToken: '',
          },
        });
      } catch (error: any) {
        return response(
          res,
          httpCodes.internalServerError,
          error.message,
          null
        );
      }
    }
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
  return res.send({
    message: 'Logged out',
  });
};

const logoutDoctor = async (req: Request, res: Response) => {
  res.clearCookie('refreshtoken', { path: '/refresh_token' });

  const userEmail = isAuth(req);

  try {
    const user = await prisma.doctor.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (user) {
      try {
        await prisma.admin.update({
          where: {
            email: userEmail,
          },
          data: {
            refreshToken: '',
          },
        });
      } catch (error: any) {
        return response(
          res,
          httpCodes.internalServerError,
          error.message,
          null
        );
      }
    }
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
  return res.send({
    message: 'Logged out',
  });
};

export default { logoutAdmin, logoutPatient, logoutDoctor };
