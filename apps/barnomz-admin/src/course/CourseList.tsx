import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { DEPARTMENT_TITLE_FIELD } from "../department/DepartmentTitle";

export const CourseList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Courses"}
      perPage={50}
      pagination={<Pagination />}
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
        <TextField label="Number of Petitioners" source="numberOfPetitioners" />
        <DateField source="updatedAt" label="Updated At" />
      </Datagrid>
    </List>
  );
};
