import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { CourseLecturerResolverBase } from "./base/courseLecturer.resolver.base";
import { CourseLecturer } from "./base/CourseLecturer";
import { CourseLecturerService } from "./courseLecturer.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => CourseLecturer)
export class CourseLecturerResolver extends CourseLecturerResolverBase {
  constructor(
    protected readonly service: CourseLecturerService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
