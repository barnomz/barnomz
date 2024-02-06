import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
  ReferenceField,
} from "react-admin";

import { DEPARTMENT_TITLE_FIELD } from "./DepartmentTitle";

export const DepartmentShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField label="Code" source="code" />
        <DateField source="createdAt" label="Created At" />
        <TextField label="ID" source="id" />
        <TextField label="Name" source="name" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="Course"
          target="departmentId"
          label="Courses"
        >
          <Datagrid rowClick="show">
            <TextField label="Capacity" source="capacity" />
            <TextField label="Code" source="code" />
            <DateField source="createdAt" label="Created At" />
            <TextField label="Credit" source="credit" />
            <ReferenceField
              label="Department"
              source="department.id"
              reference="Department"
            >
              <TextField source={DEPARTMENT_TITLE_FIELD} />
            </ReferenceField>
            <TextField label="Exam Date" source="examDate" />
            <TextField label="Grade" source="grade" />
            <TextField label="Group" source="group" />
            <TextField label="ID" source="id" />
            <TextField label="Info" source="info" />
            <TextField label="Name" source="name" />
            <TextField label="Number of Enrolled" source="numberOfEnrolled" />
            <TextField
              label="Number of Petitioners"
              source="numberOfPetitioners"
            />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          reference="Lecturer"
          target="departmentId"
          label="Lecturers"
        >
          <Datagrid rowClick="show">
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
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
