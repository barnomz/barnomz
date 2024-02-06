import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { ScheduleCourseResolverBase } from "./base/scheduleCourse.resolver.base";
import { ScheduleCourse } from "./base/ScheduleCourse";
import { ScheduleCourseService } from "./scheduleCourse.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => ScheduleCourse)
export class ScheduleCourseResolver extends ScheduleCourseResolverBase {
  constructor(
    protected readonly service: ScheduleCourseService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
