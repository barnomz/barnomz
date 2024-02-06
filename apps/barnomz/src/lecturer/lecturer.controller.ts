import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LecturerService } from "./lecturer.service";
import { LecturerControllerBase } from "./base/lecturer.controller.base";

@swagger.ApiTags("lecturers")
@common.Controller("lecturers")
export class LecturerController extends LecturerControllerBase {
  constructor(
    protected readonly service: LecturerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
