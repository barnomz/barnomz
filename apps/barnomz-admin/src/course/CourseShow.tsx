import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  TextField,
  DateField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
} from "react-admin";

import { COURSE_TITLE_FIELD } from "./CourseTitle";
import { LECTURER_TITLE_FIELD } from "../lecturer/LecturerTitle";
import { SCHEDULE_TITLE_FIELD } from "../schedule/ScheduleTitle";
import { DEPARTMENT_TITLE_FIELD } from "../department/DepartmentTitle";

export const CourseShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
        <TextField label="Number of Petitioners" source="numberOfPetitioners" />
        <DateField source="updatedAt" label="Updated At" />
        <ReferenceManyField
          reference="CourseLecturer"
          target="courseId"
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
          reference="CourseSession"
          target="courseId"
          label="CourseSessions"
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
            <TextField label="Day of Week" source="dayOfWeek" />
            <TextField label="End Time" source="endTime" />
            <TextField label="ID" source="id" />
            <TextField label="Start Time" source="startTime" />
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceManyField
          reference="ScheduleCourse"
          target="courseId"
          label="ScheduleCourses"
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
              label="Schedule"
              source="schedule.id"
              reference="Schedule"
            >
              <TextField source={SCHEDULE_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="Updated At" />
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
