"use client";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

export type SceneProps = {
  setResults: React.Dispatch<React.SetStateAction<never[]>>;
  setSreachResultWindow: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = (props: SceneProps) => {
  const { setResults, setSreachResultWindow } = props;
  const [input, setInput] = useState("");

  // const fetchData = (value: any) => {
  //   fetch("/data.json")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       const results = json.filter((user: any) => {
  //         return (
  //           value &&
  //           user &&
  //           user.name &&
  //           user.name.toLowerCase().includes(value)
  //         );
  //       });
  //       setResults(results);
  //     });
  // };

  // useEffect(() => {
  const fetchData = async (value: any) => {
    try {
      const response = await fetch("/data.json")
        .then((response) => response.json())
        .then((json) => {
          const results = json.filter((user: any) => {
            return user && user.word && user.word.toLowerCase().includes(value);
          });
          setResults(results);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // }, []);

  const handChange = (value: any) => {
    console.log(value);
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
            onChange={(e) => {
              // console.log(e.target.value.toLowerCase());
              handChange(e.target.value.toLowerCase());
            }}
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
