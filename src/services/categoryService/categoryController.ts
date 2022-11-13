import { Request, Response } from 'express';
import { PrismaClient, Categories } from '@prisma/client';
import response from '@utils/response';
import httpCodes from '@utils/httpCodes';

const prisma = new PrismaClient();

// Create Category
const createCategory = async (req: Request, res: Response) => {
  try {
    const createCategory = await prisma.category.createMany({
      data: [
        { categoryName: Categories.Neurology },
        { categoryName: Categories.Psychiatry },
      ],
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
const getAllCategory = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findMany({
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

// Get Category by Id
const getCategoryById = async (req: Request, res: Response) => {
  try {
    let categoryParams;

    if (req.params.category === Categories.Neurology) {
      categoryParams = Categories.Neurology;
    } else if (req.params.category === Categories.Psychiatry) {
      categoryParams = Categories.Psychiatry;
    } else {
      return response(
        res,
        httpCodes.notFound,
        'Page that you looking for is not found.',
        null
      );
    }
    const category = await prisma.category.findUnique({
      where: {
        categoryName: categoryParams,
      },
      include: {
        doctor: true,
        medicalRecord: true,
      },
    });

    return response(res, httpCodes.ok, 'Get Category Data Success', category);
  } catch (error) {
    return response(res, httpCodes.forbidden, 'Get Category Data Failed', null);
  }
};

export default {
  createCategory,
  getAllCategory,
  getCategoryById,
};
