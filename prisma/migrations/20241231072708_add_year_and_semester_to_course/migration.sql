-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('FIRST', 'SECOND', 'THIRD');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "semester" "Semester" NOT NULL DEFAULT 'FIRST',
ADD COLUMN     "year" INTEGER NOT NULL DEFAULT 1403;
