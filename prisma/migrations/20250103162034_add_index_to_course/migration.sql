/*
  Warnings:

  - A unique constraint covering the columns `[courseCode,group,year,semester]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Course_courseCode_group_key";

-- CreateIndex
CREATE INDEX "Course_departmentId_idx" ON "Course"("departmentId");

-- CreateIndex
CREATE INDEX "Course_year_semester_idx" ON "Course"("year", "semester");

-- CreateIndex
CREATE UNIQUE INDEX "Course_courseCode_group_year_semester_key" ON "Course"("courseCode", "group", "year", "semester");
