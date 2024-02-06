import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CourseLecturerService } from "./courseLecturer.service";
import { CourseLecturerControllerBase } from "./base/courseLecturer.controller.base";

@swagger.ApiTags("courseLecturers")
@common.Controller("courseLecturers")
export class CourseLecturerController extends CourseLecturerControllerBase {
  constructor(
    protected readonly service: CourseLecturerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
