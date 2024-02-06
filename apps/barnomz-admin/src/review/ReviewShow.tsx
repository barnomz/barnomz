import * as React from "react";

import {
  Show,
  SimpleShowLayout,
  ShowProps,
  DateField,
  TextField,
  ReferenceField,
  ReferenceManyField,
  Datagrid,
  BooleanField,
} from "react-admin";

import { REVIEW_TITLE_FIELD } from "./ReviewTitle";
import { USER_TITLE_FIELD } from "../user/UserTitle";
import { LECTURER_TITLE_FIELD } from "../lecturer/LecturerTitle";

export const ReviewShow = (props: ShowProps): React.ReactElement => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
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
        <ReferenceManyField
          reference="ReviewLike"
          target="reviewId"
          label="ReviewLikes"
        >
          <Datagrid rowClick="show">
            <DateField source="createdAt" label="Created At" />
            <TextField label="ID" source="id" />
            <BooleanField label="Like" source="like" />
            <ReferenceField
              label="Review"
              source="review.id"
              reference="Review"
            >
              <TextField source={REVIEW_TITLE_FIELD} />
            </ReferenceField>
            <DateField source="updatedAt" label="Updated At" />
            <ReferenceField label="User" source="user.id" reference="User">
              <TextField source={USER_TITLE_FIELD} />
            </ReferenceField>
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  );
};
