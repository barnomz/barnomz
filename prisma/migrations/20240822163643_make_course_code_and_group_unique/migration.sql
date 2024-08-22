/*
  Warnings:

  - A unique constraint covering the columns `[courseCode,group]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_courseCode_group_key" ON "Course"("courseCode", "group");
