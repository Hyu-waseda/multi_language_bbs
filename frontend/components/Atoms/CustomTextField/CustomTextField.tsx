import React from "react";
import { TextField } from "@mui/material";

interface Props {
  name: string;
  label: string;
  // registerとerrorsは複雑になりすぎるためany
  register: any;
  errors: any;
  rows: number;
  isInputRequired?: boolean;
}

const CustomTextField: React.FC<Props> = (props) => {
  const validationRules: Record<string, any> =
    props.isInputRequired !== false
      ? { required: `${props.label}は必須です` }
      : {};

  validationRules.maxLength = {
    value: 255,
    message: `${props.label}は255文字以下で入力してください`,
  };

  return (
    <TextField
      fullWidth
      label={props.label}
      {...props.register(props.name, validationRules)}
      error={Boolean(props.errors[props.name])}
      helperText={props.errors[props.name]?.message}
      rows={props.rows}
      multiline
    />
  );
};

export default CustomTextField;
