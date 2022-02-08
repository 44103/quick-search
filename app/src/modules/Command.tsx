import * as React from "react";
import "./Command.css"

type Props = {
  head: string,
  buttons: {
    data: string,
    text: string
  }[],
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
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
