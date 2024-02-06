import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LecturerServiceBase } from "./base/lecturer.service.base";

@Injectable()
export class LecturerService extends LecturerServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
