"use client";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";
import { RiGlobalLine } from "react-icons/ri";
import { PiTranslateLight } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { BsSoundwave } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Header from "./Header";
import Searchresult from "./Searchresult";
import SearchDisplay from "./SearchDisplay";

export default function Home() {
  const [results, setResults] = useState([]);
  const [sreachResultWindow, setSreachResultWindow] = useState("");
  const [clickResult, setClickResult] = useState([]);

  console.log(clickResult);

  return (
    <div className="w-full h-screen items-center justify-between sm:p-0 px-4">
      <Header />
      <div className="sm:w-[720px] mx-auto mt-10">
        <SearchBar
          setResults={setResults}
          setSreachResultWindow={setSreachResultWindow}
        />
        <Searchresult
          results={results}
          setSreachResultWindow={setSreachResultWindow}
          sreachResultWindow={sreachResultWindow}
          setClickResult={setClickResult}
        />
        <SearchDisplay clickResult={clickResult} />
      </div>
    </div>
  );
}
