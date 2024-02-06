import * as React from "react";

import {
  Edit,
  SimpleForm,
  EditProps,
  NumberInput,
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  TextInput,
} from "react-admin";

import { LecturerTitle } from "../lecturer/LecturerTitle";
import { ReviewLikeTitle } from "../reviewLike/ReviewLikeTitle";

export const ReviewEdit = (props: EditProps): React.ReactElement => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput
          step={1}
          label=" Exam Difficulty Rating"
          source="examDifficultyRating"
        />
        <ReferenceInput
          source="lecturer.id"
          reference="Lecturer"
          label="Lecturer"
        >
          <SelectInput optionText={LecturerTitle} />
        </ReferenceInput>
        <NumberInput step={1} label="Morality Rating" source="moralityRating" />
        <NumberInput step={1} label="Pressure Rating" source="pressureRating" />
        <NumberInput label="Rating" source="rating" />
        <ReferenceArrayInput
          source="reviewLikes"
          reference="ReviewLike"
          parse={(value: any) => value && value.map((v: any) => ({ id: v }))}
          format={(value: any) => value && value.map((v: any) => v.id)}
        >
          <SelectArrayInput optionText={ReviewLikeTitle} />
        </ReferenceArrayInput>
        <NumberInput step={1} label="Teaching Rating" source="teachingRating" />
        <TextInput label="Text" multiline source="text" />
      </SimpleForm>
    </Edit>
  );
};
