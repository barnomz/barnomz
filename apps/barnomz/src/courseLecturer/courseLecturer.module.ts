import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CourseLecturerModuleBase } from "./base/courseLecturer.module.base";
import { CourseLecturerService } from "./courseLecturer.service";
import { CourseLecturerController } from "./courseLecturer.controller";
import { CourseLecturerResolver } from "./courseLecturer.resolver";

@Module({
  imports: [CourseLecturerModuleBase, forwardRef(() => AuthModule)],
  controllers: [CourseLecturerController],
  providers: [CourseLecturerService, CourseLecturerResolver],
  exports: [CourseLecturerService],
})
export class CourseLecturerModule {}
