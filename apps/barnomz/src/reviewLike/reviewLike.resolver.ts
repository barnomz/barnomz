import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { ReviewLikeResolverBase } from "./base/reviewLike.resolver.base";
import { ReviewLike } from "./base/ReviewLike";
import { ReviewLikeService } from "./reviewLike.service";

@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => ReviewLike)
export class ReviewLikeResolver extends ReviewLikeResolverBase {
  constructor(
    protected readonly service: ReviewLikeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
