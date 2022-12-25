-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "refreshToken" TEXT;

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "refreshToken" TEXT;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "refreshToken" TEXT;
