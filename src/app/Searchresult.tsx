import React, { useState } from "react";
import { BsTranslate } from "react-icons/bs";

export type SceneProps = {
  results: Array<[]>;
  setSreachResultWindow: React.Dispatch<React.SetStateAction<string>>;
  sreachResultWindow: string;
  setClickResult: React.Dispatch<React.SetStateAction<never[]>>;
};

const Searchresult = (props: SceneProps) => {
  const { results, sreachResultWindow, setSreachResultWindow, setClickResult } =
    props;
  console.log(results);

  return (
    <div className="text-black bg-[#EEEEEE]  rounded-[10px] mt-1">
      {results.map((result, id) => {
        return (
          <div
            key={id}
            style={{ display: sreachResultWindow }}
            className="w-full items-center cursor-pointer text-[#1C2C39]/80 px-5 py-3.5 text-[16px] hover:bg-[#B2B2B2]/20 hover:rounded-[10px]"
            onClick={() => {
              setClickResult(result);
              setSreachResultWindow("none");
              console.log("result", result);
            }}
          >
            <BsTranslate className="mr-3 text-[#B2B2B2]" />
            {result.name}
          </div>
        );
      })}
    </div>
  );
};

export default Searchresult;
