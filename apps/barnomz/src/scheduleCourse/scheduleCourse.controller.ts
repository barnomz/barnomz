import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ScheduleCourseService } from "./scheduleCourse.service";
import { ScheduleCourseControllerBase } from "./base/scheduleCourse.controller.base";

@swagger.ApiTags("scheduleCourses")
@common.Controller("scheduleCourses")
export class ScheduleCourseController extends ScheduleCourseControllerBase {
  constructor(
    protected readonly service: ScheduleCourseService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
