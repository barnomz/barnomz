import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { CourseTitle } from "../course/CourseTitle";
import { LecturerTitle } from "../lecturer/LecturerTitle";

export const CourseLecturerEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
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
    </Edit>
  );
};
