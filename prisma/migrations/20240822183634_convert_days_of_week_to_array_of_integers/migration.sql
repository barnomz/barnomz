/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "dayOfWeek",
ADD COLUMN     "daysOfWeek" INTEGER[];
