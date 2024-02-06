import { DepartmentWhereInput } from "./DepartmentWhereInput";
import { DepartmentOrderByInput } from "./DepartmentOrderByInput";

export type DepartmentFindManyArgs = {
  where?: DepartmentWhereInput;
  orderBy?: Array<DepartmentOrderByInput>;
  skip?: number;
  take?: number;
};
