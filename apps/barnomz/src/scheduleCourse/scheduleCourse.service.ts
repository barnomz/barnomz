import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ScheduleCourseServiceBase } from "./base/scheduleCourse.service.base";

@Injectable()
export class ScheduleCourseService extends ScheduleCourseServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
