import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ReviewLikeService } from "./reviewLike.service";
import { ReviewLikeControllerBase } from "./base/reviewLike.controller.base";

@swagger.ApiTags("reviewLikes")
@common.Controller("reviewLikes")
export class ReviewLikeController extends ReviewLikeControllerBase {
  constructor(
    protected readonly service: ReviewLikeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
