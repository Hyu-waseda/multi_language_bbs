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
  const preventEnterSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

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
      onKeyDown={preventEnterSubmit}
      rows={props.rows}
      multiline
    />
  );
};

export default CustomTextField;
