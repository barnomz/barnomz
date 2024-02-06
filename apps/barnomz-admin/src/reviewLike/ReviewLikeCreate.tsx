import * as React from "react";
import {
  Create,
  SimpleForm,
  CreateProps,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { ReviewTitle } from "../review/ReviewTitle";
import { UserTitle } from "../user/UserTitle";

export const ReviewLikeCreate = (props: CreateProps): React.ReactElement => {
  return (
    <Create {...props}>
      <SimpleForm>
        <BooleanInput label="Like" source="like" />
        <ReferenceInput source="review.id" reference="Review" label="Review">
          <SelectInput optionText={ReviewTitle} />
        </ReferenceInput>
        <ReferenceInput source="user.id" reference="User" label="User">
          <SelectInput optionText={UserTitle} />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
