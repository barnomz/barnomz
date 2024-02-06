import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ReviewLikeModuleBase } from "./base/reviewLike.module.base";
import { ReviewLikeService } from "./reviewLike.service";
import { ReviewLikeController } from "./reviewLike.controller";
import { ReviewLikeResolver } from "./reviewLike.resolver";

@Module({
  imports: [ReviewLikeModuleBase, forwardRef(() => AuthModule)],
  controllers: [ReviewLikeController],
  providers: [ReviewLikeService, ReviewLikeResolver],
  exports: [ReviewLikeService],
})
export class ReviewLikeModule {}
