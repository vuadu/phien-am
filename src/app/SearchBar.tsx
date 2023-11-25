"use client";
import React, { useEffect, ChangeEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";

export type SearchBarProps = {
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
  setSreachResultWindow: React.Dispatch<React.SetStateAction<string>>;
  setClickResult: React.Dispatch<any>;
};

const SearchBar = (props: SearchBarProps) => {
  const { setResults, setSreachResultWindow, setClickResult } = props;
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (value: any) => {
    try {
      const response = await fetch("./data.json")
        .then((response) => response.json())
        .then((json: any) => {
          console.log(json);
          const results = json.filter((user: any) => {
            return user && user.word && user.word.toLowerCase().includes(value);
          });
          setResults(results);
          console.log("data response", results);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Search term entered:", searchTerm);

    const payload = {
      word: searchTerm,
    };

    const dataSet: any[] = [];
    try {
      const response = await fetch("/api/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data: any = await response.json();
        dataSet.push(data);
        setClickResult(data);
        setSreachResultWindow("none");
        console.log("API response array:", dataSet);

        // Handle the response as needed
      } else {
        console.error("API request failed:", response.statusText);
        // Handle error response
      }
    } catch (error) {
      console.error("Error during API request:", error);
      // Handle network or other errors
    }
  };

  const handleChange = (e: any) => {
    const value = e.currentTarget.value;
    console.log(value);
    setSearchTerm(value);
    fetchData(value);
  };
  return (
    <div className="w-full flex items-center mt-4 h-[50px] bg-[#EEEEEE] dark:bg-transparent dark:border-[1px] dark:border-[#364154] text-[#B2B2B2] text-[20px] font-regular py-2 px-4 rounded-[10px]">
      <BiSearch size={24} className="text-[#B2B2B2]" />
      <div className="w-full">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            title="Tìm kiếm"
            className=" px-2 w-full outline-none bg-transparent text-[#B2B2B2]"
            placeholder="Tìm kiếm từ khoá"
            onChange={handleChange}
            onClick={() => {
              setSreachResultWindow("flex");
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
