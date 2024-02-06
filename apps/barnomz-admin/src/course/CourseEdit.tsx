import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceInput,
  SelectInput,
  DateTimeInput,
} from "react-admin";

import { CourseLecturerTitle } from "../courseLecturer/CourseLecturerTitle";
import { CourseSessionTitle } from "../courseSession/CourseSessionTitle";
import { DepartmentTitle } from "../department/DepartmentTitle";
import { LecturerTitle } from "../lecturer/LecturerTitle";
import { ScheduleCourseTitle } from "../scheduleCourse/ScheduleCourseTitle";

export const CourseEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput step={1} label="Capacity" source="capacity" />
        <TextInput label="Code" source="code" />
        <ReferenceArrayInput
          source="courseLecturers"
          reference="CourseLecturer"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={CourseLecturerTitle} />
        </ReferenceArrayInput>
        <ReferenceArrayInput
          source="courseSessions"
          reference="CourseSession"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={CourseSessionTitle} />
        </ReferenceArrayInput>
        <NumberInput step={1} label="Credit" source="credit" />
        <ReferenceInput
          source="department.id"
          reference="Department"
          label="Department"
        >
          <SelectInput optionText={DepartmentTitle} />
        </ReferenceInput>
        <DateTimeInput label="Exam Date" source="examDate" />
        <SelectInput
          source="grade"
          label="Grade"
          choices={[
            { label: "Bachelor of Science", value: "BSC" },
            { label: "Master of Science", value: "MSC" },
            { label: "Doctor of Philosophy", value: "PhD" },
          ]}
          optionText="label"
          allowEmpty
          optionValue="value"
        />
        <NumberInput step={1} label="Group" source="group" />
        <TextInput label="Info" multiline source="info" />
        <ReferenceArrayInput
          source="lecturer"
          reference="Lecturer"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={LecturerTitle} />
        </ReferenceArrayInput>
        <TextInput label="Name" source="name" />
        <NumberInput
          step={1}
          label="Number of Enrolled"
          source="numberOfEnrolled"
        />
        <NumberInput
          step={1}
          label="Number of Petitioners"
          source="numberOfPetitioners"
        />
        <ReferenceArrayInput
          source="scheduleCourses"
          reference="ScheduleCourse"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={ScheduleCourseTitle} />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
