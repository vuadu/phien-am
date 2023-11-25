import React from "react";

export type SearchDisplayProps = {
  clickResult: {
    word: string;
    engspell: string;
    viespell: string;
  } | null; // Make sure clickResult can be null
};

const SearchDisplay = (props: SearchDisplayProps) => {
  const { clickResult } = props;
  console.log(clickResult);

  if (clickResult) {
    return (
      <div className="absolute top-1/3 px-4">
        <p className="text-[#1C2C39] dark:text-white text-[36px] font-medium">
          {clickResult.word.toUpperCase()}
        </p>
        <p className="text-[16px] dark:text-[#8D98AB] text-[#B2B2B2] font-regular ml-1">
          {clickResult.engspell}
        </p>
        <p className="text-[#3662E3] text-[42px] sm:text-[52px] font-[600] mt-2">
          {clickResult.viespell}
        </p>
      </div>
    );
  } else {
    return;
  }
};

export default SearchDisplay;
