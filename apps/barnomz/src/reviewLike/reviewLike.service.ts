import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ReviewLikeServiceBase } from "./base/reviewLike.service.base";

@Injectable()
export class ReviewLikeService extends ReviewLikeServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
