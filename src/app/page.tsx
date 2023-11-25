"use client";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Header from "./Header";
import SearchDisplay from "./SearchDisplay";
import SearchResult from "./SearchResult";
// import { getVieTranslation } from "../..";
import Redis from "ioredis";

export type SceneProps = {
  clickResult: {
    word: string;
    engspell: string;
    viespell: string;
  };
};

export default function Home() {
  const [results, setResults] = useState<Array<any>>([]);
  const [sreachResultWindow, setSreachResultWindow] = useState<string>("");
  const [clickResult, setClickResult] = useState<any>(null);

  // console.log(getVieTranslation("about"));

  const changeTheme = () => {
    // console.log(localStorage.theme);
    // if (localStorage.theme === "dark") {
    //   localStorage.theme = "light";
    //   document.documentElement.classList.remove("dark");
    // } else {
    //   localStorage.theme = "dark";
    //   document.documentElement.classList.add("dark");
    // }
  };

  return (
    <div className="w-full h-screen items-center justify-between sm:p-0 px-4 bg-white dark:bg-[#101729]">
      <Header changeTheme={changeTheme} />

      <div className="sm:w-[720px] mx-auto mt-10 ">
        <div className="max-w-[720px] positive">
          <SearchBar
            setResults={setResults}
            setSreachResultWindow={setSreachResultWindow}
            setClickResult={setClickResult}
          />
          <SearchResult
            results={results}
            setSreachResultWindow={setSreachResultWindow}
            sreachResultWindow={sreachResultWindow}
            setClickResult={setClickResult}
          />
        </div>
        <SearchDisplay clickResult={clickResult} />
      </div>
    </div>
  );
}
