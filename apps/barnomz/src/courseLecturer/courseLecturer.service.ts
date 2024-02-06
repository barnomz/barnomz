import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CourseLecturerServiceBase } from "./base/courseLecturer.service.base";

@Injectable()
export class CourseLecturerService extends CourseLecturerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
