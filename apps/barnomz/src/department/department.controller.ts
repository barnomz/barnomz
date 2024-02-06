import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { DepartmentService } from "./department.service";
import { DepartmentControllerBase } from "./base/department.controller.base";

@swagger.ApiTags("departments")
@common.Controller("departments")
export class DepartmentController extends DepartmentControllerBase {
  constructor(
    protected readonly service: DepartmentService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
