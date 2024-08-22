/*
  Warnings:

  - The primary key for the `Department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `communicationRate` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `examDifficultyRate` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `knowledgeRate` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfVotes` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `teachingRate` on the `Professor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_departmentId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "departmentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Department" DROP CONSTRAINT "Department_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "communicationRate",
DROP COLUMN "examDifficultyRate",
DROP COLUMN "knowledgeRate",
DROP COLUMN "numberOfVotes",
DROP COLUMN "rate",
DROP COLUMN "teachingRate",
ALTER COLUMN "departmentId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("code") ON DELETE SET NULL ON UPDATE CASCADE;
