import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import response from '@utils/response';
import httpCodes from '@utils/httpCodes';

const prisma = new PrismaClient();

// Create Category
const createMedicalRecord = async (req: Request, res: Response) => {
  try {
    const { description, patientGovId, doctorGovId, categoryId } = req.body;
    const createCategory = await prisma.medicalRecord.create({
      data: {
        patientGovId,
        doctorGovId,
        categoryId,
        description,
      },
    });

    return response(
      res,
      httpCodes.created,
      'Default category has been created',
      createCategory
    );
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

// Get All Category
const getAllMedicalRecord = async (req: Request, res: Response) => {
  try {
    const category = await prisma.medicalRecord.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return response(
      res,
      httpCodes.ok,
      'Get all Category Data Success',
      category
    );
  } catch (error) {
    return response(
      res,
      httpCodes.forbidden,
      'Get all Category Data Failed',
      null
    );
  }
};

// Get All Category
const getMedicalRecordById = async (req: Request, res: Response) => {
  try {
    const category = await prisma.medicalRecord.findUnique({
      where: {
        medRecId: Number(req.params.medRecId),
      },
      include: {
        patientData: true,
        doctorData: true,
        category: true,
      },
    });

    return response(res, httpCodes.ok, 'Get Category Data Success', category);
  } catch (error) {
    return response(res, httpCodes.forbidden, 'Get Category Data Failed', null);
  }
};

export default {
  createMedicalRecord,
  getAllMedicalRecord,
  getMedicalRecordById,
};
