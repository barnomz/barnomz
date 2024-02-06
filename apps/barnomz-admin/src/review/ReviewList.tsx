import * as React from "react";
import {
  List,
  Datagrid,
  ListProps,
  DateField,
  TextField,
  ReferenceField,
} from "react-admin";
import Pagination from "../Components/Pagination";
import { LECTURER_TITLE_FIELD } from "../lecturer/LecturerTitle";

export const ReviewList = (props: ListProps): React.ReactElement => {
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title={"Reviews"}
      perPage={50}
      pagination={<Pagination />}
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
    </List>
  );
};
