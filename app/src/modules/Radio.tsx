import React from "react";

type Props = {
  head: string,
  radios: {
    value: string,
    label: string
  }[],
  value: string
}

const Radio = (props: Props) => {
  return (
    <div>
      <h3>{props.head}</h3>
      {props.radios.map((val) => {
        return (
          <label>
            <input
              type="radio"
              name={props.head.toLowerCase()}
              value={val.value}
              checked={val.value === props.value} />
            {val.label}
          </label>
        )
      })}
    </div>
  );
}

export default Radio;
