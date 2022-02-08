import React, { Dispatch, SetStateAction } from "react";
import "./Command.css"

type Props = {
  head: string,
  buttons: {
    data: string,
    text: string
  }[],
  value: string,
  setValue: Dispatch<SetStateAction<string>>
};

const Command = (props: Props) => {
  return (
    <div className="cmd">
      <span className="head">{props.head}</span>
      {props.buttons.map((val) => {
        return (
          <button
            onClick={() => props.setValue(val.data)}
            disabled={val.data === props.value}>
            {val.text}
          </button>
        );
      })}
    </div>
  );
};

export default Command;
