import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ScheduleCourseModuleBase } from "./base/scheduleCourse.module.base";
import { ScheduleCourseService } from "./scheduleCourse.service";
import { ScheduleCourseController } from "./scheduleCourse.controller";
import { ScheduleCourseResolver } from "./scheduleCourse.resolver";

@Module({
  imports: [ScheduleCourseModuleBase, forwardRef(() => AuthModule)],
  controllers: [ScheduleCourseController],
  providers: [ScheduleCourseService, ScheduleCourseResolver],
  exports: [ScheduleCourseService],
})
export class ScheduleCourseModule {}
