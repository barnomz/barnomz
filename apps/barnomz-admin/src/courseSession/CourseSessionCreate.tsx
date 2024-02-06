import * as React from "react";

import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
  NumberInput,
  TextInput,
} from "react-admin";

import { CourseTitle } from "../course/CourseTitle";

export const CourseSessionCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="course.id" reference="Course" label="Course">
          <SelectInput optionText={CourseTitle} />
        </ReferenceInput>
        <NumberInput step={1} label="Day of Week" source="dayOfWeek" />
        <TextInput label="End Time" source="endTime" />
        <TextInput label="Start Time" source="startTime" />
      </SimpleForm>
    </Create>
  );
};
