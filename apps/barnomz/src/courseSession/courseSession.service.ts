import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CourseSessionServiceBase } from "./base/courseSession.service.base";

@Injectable()
export class CourseSessionService extends CourseSessionServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
