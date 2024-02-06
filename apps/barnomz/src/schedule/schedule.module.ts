import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { ScheduleModuleBase } from "./base/schedule.module.base";
import { ScheduleService } from "./schedule.service";
import { ScheduleController } from "./schedule.controller";
import { ScheduleResolver } from "./schedule.resolver";

@Module({
  imports: [ScheduleModuleBase, forwardRef(() => AuthModule)],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleResolver],
  exports: [ScheduleService],
})
export class ScheduleModule {}
