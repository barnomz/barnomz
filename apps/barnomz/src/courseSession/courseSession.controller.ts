import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CourseSessionService } from "./courseSession.service";
import { CourseSessionControllerBase } from "./base/courseSession.controller.base";

@swagger.ApiTags("courseSessions")
@common.Controller("courseSessions")
export class CourseSessionController extends CourseSessionControllerBase {
  constructor(
    protected readonly service: CourseSessionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
