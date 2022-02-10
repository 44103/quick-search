import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Radio from "./modules/Radio";
import "./Config.css"

const positionList = [
  { value: "left", label: "Left" },
  { value: "right", label: "Right" }
]

type ConfData = {
  position: string,
  theme: string
}

const Config = () => {
  const [position, setPosition] = useState("");
  const init = useRef(true);

  const onChange = (event: ChangeEvent<HTMLFormElement>) => {
    const elements = event.target.form.elements as HTMLFormControlsCollection;
    const positionList = elements.namedItem("position") as RadioNodeList;

    setPosition(positionList.value);
  }

  useEffect(() => {
    chrome.storage.sync.get(['qs_conf'], (val) => {
      const config = val.qs_conf as ConfData;
      setPosition(config.position);
    });
  }, []);

  useEffect(() => {
    const conf = {
      qs_conf: {
        position: position
      }
    }
    chrome.storage.sync.set(conf);
    if (init.current) { init.current = false; return; }
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id === undefined) return;
      chrome.tabs.sendMessage(tabs[0].id, conf);
    });
  }, [position]);

  return (
    <body>
      <h2>Quick Search Config</h2>
      <form onChange={onChange}>
        <div className="config">
          <Radio head={"Position"} value={position} radios={positionList} />
        </div>
      </form>
    </body>
  );
};

export default Config;
