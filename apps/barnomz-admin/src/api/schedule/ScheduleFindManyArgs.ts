import { ScheduleWhereInput } from "./ScheduleWhereInput";
import { ScheduleOrderByInput } from "./ScheduleOrderByInput";

export type ScheduleFindManyArgs = {
  where?: ScheduleWhereInput;
  orderBy?: Array<ScheduleOrderByInput>;
  skip?: number;
  take?: number;
};
