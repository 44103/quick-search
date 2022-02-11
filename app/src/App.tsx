import React, { useState, useEffect, useRef } from "react";
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
  return res.length === 0 ? "" : res[0].replace(regex, "").replace(/,.?$/, "");
}

const App = () => {
  const [query, _] = useState(initQuery);
  const [term, setTerm] = useState(initCommand(/^tbs=qdr:/));
  const [lang, setLang] = useState(initCommand(/^lr=/));
  const init = useRef(true);

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
    <div className="quick-search">
      <Command head="Term" buttons={termList} value={term} setValue={setTerm} />
      <Command head="Language" buttons={langList} value={lang} setValue={setLang} />
    </div>
  );
};

export default App;
