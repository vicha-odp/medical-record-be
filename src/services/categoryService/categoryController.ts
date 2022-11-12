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
      'Head Admin has been created',
      createCategory
    );
  } catch (error: any) {
    return response(res, httpCodes.internalServerError, error.message, null);
  }
};

export default {
  createCategory,
};
