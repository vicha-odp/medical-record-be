import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import response from '@utils/response';
import httpCodes from '@utils/httpCodes';

const prisma = new PrismaClient();

// Get All User
const getAllAdminData = async (req: Request, res: Response) => {
  try {
    const allAdminData = await prisma.admin.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response(
      res,
      httpCodes.ok,
      'Get all Admin Data Success',
      allAdminData
    );
  } catch (error) {
    return response(
      res,
      httpCodes.forbidden,
      'Get all Admin Data Failed',
      null
    );
  }
};

const getAllPatientData = async (req: Request, res: Response) => {
  try {
    const allPatientData = await prisma.patient.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response(
      res,
      httpCodes.ok,
      'Get all Patient Data Success',
      allPatientData
    );
  } catch (error) {
    return response(
      res,
      httpCodes.forbidden,
      'Get all Patient Data Failed',
      null
    );
  }
};

const getAllDoctorData = async (req: Request, res: Response) => {
  try {
    const allDoctorData = await prisma.patient.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response(
      res,
      httpCodes.ok,
      'Get all Doctor Data Success',
      allDoctorData
    );
  } catch (error) {
    return response(
      res,
      httpCodes.forbidden,
      'Get all Doctor Data Failed',
      null
    );
  }
};

export default {
  getAllAdminData,
  getAllPatientData,
  getAllDoctorData,
};
