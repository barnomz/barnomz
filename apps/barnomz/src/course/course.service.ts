import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CourseServiceBase } from "./base/course.service.base";

@Injectable()
export class CourseService extends CourseServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
