"use client";
import React, { useEffect, ChangeEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";

export type SearchBarProps = {
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
  setSreachResultWindow: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = (props: SearchBarProps) => {
  const { setResults, setSreachResultWindow } = props;
  const [input, setInput] = useState("");

  const fetchData = async (value: any) => {
    try {
      const response = await fetch("/data.json")
        .then((response) => response.json())
        .then((json: any) => {
          console.log(json);
          const results = json.filter((user: any) => {
            return user && user.word && user.word.toLowerCase().includes(value);
          });
          setResults(results);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = (e.currentTarget as HTMLInputElement).value;
    setInput(value);
    fetchData(value);
  };
  return (
    <div className="w-full flex items-center mt-4 h-[50px] bg-[#EEEEEE] dark:bg-transparent dark:border-[1px] dark:border-[#364154] text-[#B2B2B2] text-[20px] font-regular py-2 px-4 rounded-[10px]">
      <BiSearch size={24} className="text-[#B2B2B2]" />
      <div className="w-full">
        <form action="" className="">
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
