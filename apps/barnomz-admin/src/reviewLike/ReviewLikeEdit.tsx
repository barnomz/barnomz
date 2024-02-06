import * as React from "react";
import {
  Edit,
  SimpleForm,
  EditProps,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { ReviewTitle } from "../review/ReviewTitle";
import { UserTitle } from "../user/UserTitle";

export const ReviewLikeEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <BooleanInput label="Like" source="like" />
        <ReferenceInput source="review.id" reference="Review" label="Review">
          <SelectInput optionText={ReviewTitle} />
        </ReferenceInput>
        <ReferenceInput source="user.id" reference="User" label="User">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};
