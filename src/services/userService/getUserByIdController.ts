import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import response from '@utils/response';
import httpCodes from '@utils/httpCodes';

const prisma = new PrismaClient();

// Get User Data by Id
const getUserAdminById = async (req: Request, res: Response) => {
  try {
    const userAdminById = await prisma.admin.findUnique({
      where: {
        govId: String(req.params.govId),
      },
    });

    if (!userAdminById) {
      return response(res, httpCodes.notFound, 'Admin not Found!', null);
    }

    return response(res, httpCodes.created, 'Get Admin success', userAdminById);
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

const getUserPatientById = async (req: Request, res: Response) => {
  try {
    const userPatientById = await prisma.admin.findUnique({
      where: {
        govId: String(req.params.govId),
      },
    });

    if (!userPatientById) {
      return response(res, httpCodes.notFound, 'Patient not Found!', null);
    }

    return response(
      res,
      httpCodes.created,
      'Get Patient success',
      userPatientById
    );
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

const getUserDoctorById = async (req: Request, res: Response) => {
  try {
    const userDoctorById = await prisma.admin.findUnique({
      where: {
        govId: String(req.params.govId),
      },
    });

    if (!userDoctorById) {
      return response(res, httpCodes.notFound, 'Doctor not Found!', null);
    }

    return response(
      res,
      httpCodes.created,
      'Get Doctor success',
      userDoctorById
    );
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

export default {
  getUserAdminById,
  getUserPatientById,
  getUserDoctorById,
};
