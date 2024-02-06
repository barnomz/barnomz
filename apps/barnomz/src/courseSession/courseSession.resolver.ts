import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { CourseSessionResolverBase } from "./base/courseSession.resolver.base";
import { CourseSession } from "./base/CourseSession";
import { CourseSessionService } from "./courseSession.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => CourseSession)
export class CourseSessionResolver extends CourseSessionResolverBase {
  constructor(
    protected readonly service: CourseSessionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
