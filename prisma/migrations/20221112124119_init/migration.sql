-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('Psychiatry', 'Neurology');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Patient', 'Doctor', 'Admin');

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Admin',
    "govId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "doctorId" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Doctor',
    "govId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryName" "Categories" NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("doctorId")
);

-- CreateTable
CREATE TABLE "Patient" (
    "patientId" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Patient',
    "govId" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("patientId")
);

-- CreateTable
CREATE TABLE "MedicalRecord" (
    "medRecId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "patientPatientId" INTEGER,
    "doctorDoctorId" INTEGER,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("medRecId")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" SERIAL NOT NULL,
    "categoryName" "Categories" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "_CategoryToMedicalRecord" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_govId_key" ON "Admin"("govId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_govId_key" ON "Doctor"("govId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_govId_key" ON "Patient"("govId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToMedicalRecord_AB_unique" ON "_CategoryToMedicalRecord"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToMedicalRecord_B_index" ON "_CategoryToMedicalRecord"("B");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("categoryName") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_doctorDoctorId_fkey" FOREIGN KEY ("doctorDoctorId") REFERENCES "Doctor"("doctorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalRecord" ADD CONSTRAINT "MedicalRecord_patientPatientId_fkey" FOREIGN KEY ("patientPatientId") REFERENCES "Patient"("patientId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMedicalRecord" ADD CONSTRAINT "_CategoryToMedicalRecord_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMedicalRecord" ADD CONSTRAINT "_CategoryToMedicalRecord_B_fkey" FOREIGN KEY ("B") REFERENCES "MedicalRecord"("medRecId") ON DELETE CASCADE ON UPDATE CASCADE;
