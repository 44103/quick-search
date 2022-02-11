import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./App.css";
import Command from "./modules/Command"

const termList = [
  { data: "none", text: "Any Time" },
  { data: "w1", text: "Past 1 Week" },
  { data: "m1", text: "Past 1 Month" },
  { data: "m3", text: "Past 3 Months" },
  { data: "m6", text: "Past 6 Months" },
  { data: "y1", text: "Past 1 Year" },
  { data: "y2", text: "Past 2 Years" },
  { data: "y3", text: "Past 3 Years" },
];

const langList = [
  { data: "", text: "Any Pages" },
  { data: "lang_en", text: "English Pages" },
  { data: "lang_local", text: "Local Pages" },
];

const initQuery = () => {
  let texts = window.location.search.split("&");
  return texts[0].replace(/^\?q=/, "");
}

const initCommand = (regex: RegExp) => {
  let texts = window.location.search.split("&");
  let res: string[] = [];
  res = texts.slice(1, -1).map(decodeURIComponent).filter((value) => {
    return regex.test(value);
  });
  return res.length === 0 ? "" : res[0].replace(regex, "").replace(/,.*$/, "");
}

type Style = {
  margin: string
}

type ConfData = {
  position: string
}

const App = () => {
  const [query, _] = useState(initQuery);
  const [term, setTerm] = useState(initCommand(/^tbs=qdr:/));
  const [lang, setLang] = useState(initCommand(/^lr=/));
  const [style, setStyle] = useState<Style>({ margin: "" });
  const init = useRef(true);

  useLayoutEffect(() => {
    const convertConftoStyle = (conf: ConfData) => {
      return {
        margin: conf.position === "left" ? "0 0 0 10px" : "0 10px 0 auto",
        display: "block"
      }
    }
    chrome.storage.sync.get("qs_conf", (items) => {
      const conf = items.qs_conf as ConfData;
      setStyle(convertConftoStyle(conf));
    });
    chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
      const conf = request.qs_conf as ConfData;
      setStyle(convertConftoStyle(conf));
    })
  }, []);

  useEffect(() => {
    if (init.current) { init.current = false; return; }
    window.location.href = [
      `https://www.google.com/search?q=${query}`,
      `tbs=qdr:${term}`,
      `lr=${lang}`,
      "tbm="
    ].join("&");
  }, [term, lang]);

  return (
    <div className="quick-search" style={style}>
      <Command head="Term" buttons={termList} value={term} setValue={setTerm} />
      <Command head="Language" buttons={langList} value={lang} setValue={setLang} />
    </div>
  );
};

export default App;
