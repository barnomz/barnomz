/*
  Warnings:

  - You are about to drop the `ClassSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Classroom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ScheduleToClassSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dayOfWeek` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClassSession" DROP CONSTRAINT "ClassSession_courseId_fkey";

-- DropForeignKey
ALTER TABLE "ClassSession" DROP CONSTRAINT "ClassSession_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_locationId_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleToClassSession" DROP CONSTRAINT "_ScheduleToClassSession_A_fkey";

-- DropForeignKey
ALTER TABLE "_ScheduleToClassSession" DROP CONSTRAINT "_ScheduleToClassSession_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "dayOfWeek" TEXT NOT NULL,
ADD COLUMN     "endTime" TIME,
ADD COLUMN     "startTime" TIME;

-- DropTable
DROP TABLE "ClassSession";

-- DropTable
DROP TABLE "Classroom";

-- DropTable
DROP TABLE "_ScheduleToClassSession";

-- CreateTable
CREATE TABLE "_ScheduleToCourse" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleToCourse_AB_unique" ON "_ScheduleToCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleToCourse_B_index" ON "_ScheduleToCourse"("B");

-- AddForeignKey
ALTER TABLE "_ScheduleToCourse" ADD CONSTRAINT "_ScheduleToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToCourse" ADD CONSTRAINT "_ScheduleToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
