import { Request, Response } from 'express';
import { PrismaClient, Categories } from '@prisma/client';
import response from '@utils/response';
import httpCodes from '@utils/httpCodes';

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

    const userAdminById = await prisma.admin.findUnique({
      where: {
        govId: String(req.params.govId),
      },
    });

    if (!userAdminById) {
      return response(
        res,
        httpCodes.forbidden,
        'Default admin already exist!',
        null
      );
    } else {
      const userDefaultAdmin = await prisma.admin.create({
        data: {
          govId,
          name,
          email,
          password,
        },
      });
      return response(
        res,
        httpCodes.created,
        'Head Admin has been created',
        userDefaultAdmin
      );
    }
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

const createUserAdmin = async (req: Request, res: Response) => {
  try {
    const { govId, name, email, password } = req.body;

    const userAdmin = await prisma.admin.create({
      data: {
        govId,
        name,
        email,
        password,
      },
    });
    return response(
      res,
      httpCodes.created,
      'New Admin has been created',
      userAdmin
    );
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

const createUserPatient = async (req: Request, res: Response) => {
  try {
    const { govId, name, email, password } = req.body;

    const userPatient = await prisma.patient.create({
      data: {
        govId,
        name,
        email,
        password,
      },
    });

    return response(
      res,
      httpCodes.created,
      'Patient created successfully!',
      userPatient
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

    const userDoctor = await prisma.doctor.create({
      data: {
        govId,
        name,
        email,
        password,
        categoryName,
      },
    });

    return response(
      res,
      httpCodes.created,
      'Patient created successfully!',
      userDoctor
    );
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

export default {
  createUserDefaultAdmin,
  createUserAdmin,
  createUserPatient,
  createUserDoctor,
};
