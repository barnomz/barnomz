import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ScheduleService } from "./schedule.service";
import { ScheduleControllerBase } from "./base/schedule.controller.base";

@swagger.ApiTags("schedules")
@common.Controller("schedules")
export class ScheduleController extends ScheduleControllerBase {
  constructor(
    protected readonly service: ScheduleService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
