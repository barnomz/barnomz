import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { LecturerModuleBase } from "./base/lecturer.module.base";
import { LecturerService } from "./lecturer.service";
import { LecturerController } from "./lecturer.controller";
import { LecturerResolver } from "./lecturer.resolver";

@Module({
  imports: [LecturerModuleBase, forwardRef(() => AuthModule)],
  controllers: [LecturerController],
  providers: [LecturerService, LecturerResolver],
  exports: [LecturerService],
})
export class LecturerModule {}
