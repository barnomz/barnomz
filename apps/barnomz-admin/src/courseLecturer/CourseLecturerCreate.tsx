import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CourseTitle } from "../course/CourseTitle";
import { LecturerTitle } from "../lecturer/LecturerTitle";

export const CourseLecturerCreate = (
  props: CreateProps
): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="course.id" reference="Course" label="Course">
          <SelectInput optionText={CourseTitle} />
        </ReferenceInput>
        <ReferenceInput
          source="lecturer.id"
          reference="Lecturer"
          label="Lecturer"
        >
          <SelectInput optionText={LecturerTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
