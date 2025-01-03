/*
  Warnings:

  - The `semester` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "semester",
ADD COLUMN     "semester" INTEGER NOT NULL DEFAULT 1;

-- DropEnum
DROP TYPE "Semester";
