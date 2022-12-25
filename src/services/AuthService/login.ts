import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import response from '@utils/response';
import httpCodes from '@utils/httpCodes';
const { compare } = require('bcryptjs');
import tokens from './tokens';

const prisma = new PrismaClient();

const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new Error('Admin does not exist');

    if (user) {
      const validPasswordAdmin = await compare(password, user.password);

      if (!validPasswordAdmin) throw new Error('Password not correct');

      const accesstokenAdmin = tokens.createAccessToken(user.email);
      const refreshtokenAdmin = tokens.createRefreshToken(user.email);

      try {
        await prisma.admin.update({
          where: {
            email: email,
          },
          data: {
            refreshToken: refreshtokenAdmin,
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

      tokens.sendRefreshToken(res, refreshtokenAdmin);
      tokens.sendAccessToken(res, req, accesstokenAdmin);
    }
  } catch (err: any) {
    res.send({
      error: `${err.message}`,
    });
  }
};
const loginPatient = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.patient.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new Error('Patient does not exist');

    if (user) {
      const validPasswordPatient = await compare(password, user.password);

      if (!validPasswordPatient) throw new Error('Password not correct');

      const accesstokenPatient = tokens.createAccessToken(user.email);
      const refreshtokenPatient = tokens.createRefreshToken(user.email);

      tokens.sendRefreshToken(res, refreshtokenPatient);
      tokens.sendAccessToken(res, req, accesstokenPatient);

      try {
        await prisma.patient.update({
          where: {
            email: email,
          },
          data: {
            refreshToken: refreshtokenPatient,
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
  } catch (err: any) {
    res.send({
      error: `${err.message}`,
    });
  }
};
const loginDoctor = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.doctor.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new Error('Doctor does not exist');

    if (user) {
      const validPasswordDoctor = await compare(password, user.password);

      if (!validPasswordDoctor) throw new Error('Password not correct');

      const accesstokenDoctor = tokens.createAccessToken(user.email);
      const refreshtokenDoctor = tokens.createRefreshToken(user.email);

      tokens.sendRefreshToken(res, refreshtokenDoctor);
      tokens.sendAccessToken(res, req, accesstokenDoctor);

      try {
        await prisma.patient.update({
          where: {
            email: email,
          },
          data: {
            refreshToken: refreshtokenDoctor,
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
  } catch (err: any) {
    res.send({
      error: `${err.message}`,
    });
  }
};

export default { loginAdmin, loginPatient, loginDoctor };
