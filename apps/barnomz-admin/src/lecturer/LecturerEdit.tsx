import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  TextInput,
} from "react-admin";

import { CourseLecturerTitle } from "../courseLecturer/CourseLecturerTitle";
import { CourseTitle } from "../course/CourseTitle";
import { DepartmentTitle } from "../department/DepartmentTitle";
import { ReviewTitle } from "../review/ReviewTitle";

export const LecturerEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceArrayInput
          source="courseLecturers"
          reference="CourseLecturer"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={CourseLecturerTitle} />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          source="courses"
          reference="Course"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={CourseTitle} />
        </ReferenceArrayInput>
        <ReferenceInput
          source="department.id"
          reference="Department"
          label="Department"
        >
          <SelectInput optionText={DepartmentTitle} />
        </ReferenceInput>
        <NumberInput
          label="Exam Difficulty Rating"
          source="examDifficultyRating"
        />
        <TextInput label="Full Name" source="fullName" />
        <NumberInput label="Morality Rating" source="moralityRating" />
        <NumberInput
          step={1}
          label="Number of Reviews"
          source="numberOfReviews"
        />
        <NumberInput label="Pressure Rating" source="pressureRating" />
        <NumberInput label="Rating" source="rating" />
        <ReferenceArrayInput
          source="reviews"
          reference="Review"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={ReviewTitle} />
        </ReferenceArrayInput>
        <NumberInput label="Teaching Rating" source="teachingRating" />
      </SimpleForm>
    </Edit>
  );
};
