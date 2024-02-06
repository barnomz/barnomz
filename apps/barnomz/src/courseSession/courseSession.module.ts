import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CourseSessionModuleBase } from "./base/courseSession.module.base";
import { CourseSessionService } from "./courseSession.service";
import { CourseSessionController } from "./courseSession.controller";
import { CourseSessionResolver } from "./courseSession.resolver";

@Module({
  imports: [CourseSessionModuleBase, forwardRef(() => AuthModule)],
  controllers: [CourseSessionController],
  providers: [CourseSessionService, CourseSessionResolver],
  exports: [CourseSessionService],
})
export class CourseSessionModule {}
