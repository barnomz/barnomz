import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  ReferenceField,
  TextField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";

import { COURSE_TITLE_FIELD } from "../course/CourseTitle";
import { LECTURER_TITLE_FIELD } from "./LecturerTitle";
import { DEPARTMENT_TITLE_FIELD } from "../department/DepartmentTitle";

export const LecturerShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <DateField source="createdAt" label="Created At" />
        <ReferenceField
          label="Department"
          source="department.id"
          reference="Department"
        >
          <TextField source={DEPARTMENT_TITLE_FIELD} />
        </ReferenceField>
        <TextField
          label="Exam Difficulty Rating"
          source="examDifficultyRating"
        />
        <TextField label="Full Name" source="fullName" />
        <TextField label="ID" source="id" />
        <TextField label="Morality Rating" source="moralityRating" />
        <TextField label="Number of Reviews" source="numberOfReviews" />
        <TextField label="Pressure Rating" source="pressureRating" />
        <TextField label="Rating" source="rating" />
        <TextField label="Teaching Rating" source="teachingRating" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="CourseLecturer"
          target="lecturerId"
          label="CourseLecturers"
        >
          <Datagrid rowClick="show">
            <ReferenceField
              label="Course"
              source="course.id"
              reference="Course"
            >
              <TextField source={COURSE_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <ReferenceField
              label="Lecturer"
              source="lecturer.id"
              reference="Lecturer"
            >
              <TextField source={LECTURER_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          reference="Review"
          target="lecturerId"
          label="Reviews"
        >
          <Datagrid rowClick="show">
            <DateField source="createdAt" label="Created At" />
            <TextField
              label=" Exam Difficulty Rating"
              source="examDifficultyRating"
            />
            <TextField label="ID" source="id" />
            <ReferenceField
              label="Lecturer"
              source="lecturer.id"
              reference="Lecturer"
            >
              <TextField source={LECTURER_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Morality Rating" source="moralityRating" />
            <TextField label="Pressure Rating" source="pressureRating" />
            <TextField label="Rating" source="rating" />
            <TextField label="Teaching Rating" source="teachingRating" />
            <TextField label="Text" source="text" />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
