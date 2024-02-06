import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ScheduleServiceBase } from "./base/schedule.service.base";

@Injectable()
export class ScheduleService extends ScheduleServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
