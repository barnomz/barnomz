import { Department as TDepartment } from "../api/department/Department";

export const DEPARTMENT_TITLE_FIELD = "name";

export const DepartmentTitle = (record: TDepartment): string => {
  return record.name?.toString() || String(record.id);
};
