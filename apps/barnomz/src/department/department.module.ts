import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DepartmentModuleBase } from "./base/department.module.base";
import { DepartmentService } from "./department.service";
import { DepartmentController } from "./department.controller";
import { DepartmentResolver } from "./department.resolver";

@Module({
  imports: [DepartmentModuleBase, forwardRef(() => AuthModule)],
  controllers: [DepartmentController],
  providers: [DepartmentService, DepartmentResolver],
  exports: [DepartmentService],
})
export class DepartmentModule {}
