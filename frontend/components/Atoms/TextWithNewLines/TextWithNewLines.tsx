import React from "react";

interface Props {
  text: string;
}

const TextWithNewLines: React.FC<Props> = (props) => (
  <>
    {props.text.split("\n").map((line: string, index: number) => (
      <React.Fragment key={`${line}-${index}`}>
        {line}
        <br />
      </React.Fragment>
    ))}
  </>
);

export default TextWithNewLines;
