-- AlterTable
ALTER TABLE "ClassSession" ALTER COLUMN "startTime" DROP NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "info" DROP NOT NULL;
