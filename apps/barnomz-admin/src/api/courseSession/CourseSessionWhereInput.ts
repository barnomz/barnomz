import { CourseWhereUniqueInput } from "../course/CourseWhereUniqueInput";
import { IntFilter } from "../../util/IntFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type CourseSessionWhereInput = {
  course?: CourseWhereUniqueInput;
  dayOfWeek?: IntFilter;
  endTime?: StringNullableFilter;
  id?: StringFilter;
  startTime?: StringNullableFilter;
};
