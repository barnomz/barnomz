-- Switch Course.id from autoincrement (SERIAL int4) to a deterministic integer id:
-- {year:4}{semester:1}{courseCode:7}{group:2}{unitCount:1}
-- e.g. year 1405, semester 1, code 40424, group 1, units 3 => 140510040424013
-- This makes ids stable across database rebuilds/rescrapes.

-- 1) Detach Course.id from its autoincrement default (SERIAL / IDENTITY)
ALTER TABLE "Course" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE "Course" ALTER COLUMN "id" DROP IDENTITY IF EXISTS;

-- 2) Drop the sessions FK before changing column types
ALTER TABLE "CourseSession" DROP CONSTRAINT IF EXISTS "CourseSession_courseId_fkey";

-- 3) Widen id columns to BIGINT (no-ops if already BIGINT)
ALTER TABLE "Course" ALTER COLUMN "id" TYPE BIGINT;
ALTER TABLE "Course" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "CourseSession" ALTER COLUMN "courseId" TYPE BIGINT;
ALTER TABLE "CourseSession" ALTER COLUMN "courseId" SET NOT NULL;

-- 4) Remove the now-unused autoincrement sequence
ALTER SEQUENCE IF EXISTS "Course_id_seq" OWNED BY NONE;
DROP SEQUENCE IF EXISTS "Course_id_seq";

-- 5) Re-add the FK upgraded to ON DELETE CASCADE (matches schema.prisma)
ALTER TABLE "CourseSession" ADD CONSTRAINT "CourseSession_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
