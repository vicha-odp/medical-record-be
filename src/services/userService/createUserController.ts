import { Request, Response } from 'express';
import { PrismaClient, Categories } from '@prisma/client';
import response from '@utils/response';
import httpCodes from '@utils/httpCodes';
import { contract } from 'server';
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

// Create User
const createUserDefaultAdmin = async (req: Request, res: Response) => {
  try {
    const { govId, name, email, password } = {
      govId: '3403012604000001',
      name: 'Ilyas Adiyasa',
      email: 'ilyasadiyasa4@gmail.com',
      password: '12345678',
    };

    const hashedPassword = await hash(password, 10);

    const userAdminById = await prisma.admin.findUnique({
      where: {
        govId: String(req.params.govId),
      },
    });

    if (!userAdminById) {
      const userDefaultAdmin = await prisma.admin.create({
        data: {
          govId,
          name,
          email,
          password: hashedPassword,
        },
      });
      return response(
        res,
        httpCodes.created,
        'Head Admin has been created',
        userDefaultAdmin
      );
    } else {
      return response(
        res,
        httpCodes.forbidden,
        'Default admin already exist!',
        null
      );
    }
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

const createUserAdmin = async (req: Request, res: Response) => {
  try {
    const { govId, name, email, password } = req.body;

    const hashedPassword = await hash(password, 10);

    const userAdminById = await prisma.admin.findUnique({
      where: {
        govId: String(govId),
      },
    });

    if (!userAdminById) {
      const userAdmin = await prisma.admin.create({
        data: {
          govId,
          name,
          email,
          password: hashedPassword,
        },
      });
      return response(
        res,
        httpCodes.created,
        'Admin has been created',
        userAdmin
      );
    } else {
      return response(res, httpCodes.forbidden, 'Admin already exist!', null);
    }
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

const createUserPatient = async (req: Request, res: Response) => {
  try {
    const { govId, name, email, password } = req.body;

    const hashedPassword = await hash(password, 10);

    const userPatientById = await prisma.patient.findUnique({
      where: {
        govId: String(govId),
      },
    });

    if (!userPatientById) {
      const userPatient = await prisma.patient.create({
        data: {
          govId,
          name,
          email,
          password: hashedPassword,
        },
      });
      return response(
        res,
        httpCodes.created,
        'Patient has been created',
        userPatient
      );
    } else {
      return response(res, httpCodes.forbidden, 'Patient already exist!', null);
    }
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

const createUserPatientBlockchain = async (req: Request, res: Response) => {
  try {
    const { govId, name, address, fatherNames, motherNames } = req.body;
    const reponse = await contract.methods
      .addPatient(govId, name, address, fatherNames, motherNames)
      .send();

    return response(
      res,
      httpCodes.created,
      'Patient created successfully!',
      reponse
    );
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

const createUserDoctor = async (req: Request, res: Response) => {
  try {
    const {
      govId,
      name,
      email,
      password,
      categorySelected,
    }: {
      govId: string;
      name: string;
      email: string;
      password: string;
      categorySelected: number;
    } = req.body;

    const categoryName: Categories = categorySelected
      ? Categories.Psychiatry
      : Categories.Neurology;

    const hashedPassword = await hash(password, 10);

    const userDoctorById = await prisma.doctor.findUnique({
      where: {
        govId: String(govId),
      },
    });

    if (!userDoctorById) {
      const userDoctor = await prisma.doctor.create({
        data: {
          govId,
          name,
          email,
          password: hashedPassword,
          categoryName,
        },
      });
      return response(
        res,
        httpCodes.created,
        'Doctor has been created',
        userDoctor
      );
    } else {
      return response(res, httpCodes.forbidden, 'Doctor already exist!', null);
    }
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

export default {
  createUserDefaultAdmin,
  createUserAdmin,
  createUserPatient,
  createUserPatientBlockchain,
  createUserDoctor,
};
