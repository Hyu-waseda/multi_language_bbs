import React from "react";
import { TextField } from "@mui/material";

interface props {
  name: string;
  label: string;
  // registerとerrorsは複雑になりすぎるためany
  register: any;
  errors: any;
  rows: number;
}

const CustomTextField: React.FC<props> = (props) => {
  // Enterキーでの送信を防止するための関数
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <TextField
      fullWidth
      label={props.label}
      {...props.register(props.name, {
        required: `${props.label}は必須です`,
        maxLength: {
          value: 255,
          message: `${props.label}は255文字以下で入力してください`,
        },
      })}
      error={Boolean(props.errors[props.name])}
      helperText={props.errors[props.name]?.message}
      onKeyDown={handleKeyPress}
      rows={props.rows}
      multiline
    />
  );
};

export default CustomTextField;
