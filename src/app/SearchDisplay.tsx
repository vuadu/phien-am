import React from "react";

export type SceneProps = {
  clickResult: never[];
};

const SearchDisplay = (props: SceneProps) => {
  const { clickResult } = props;

  return (
    <div className="absolute top-1/3 px-4">
      <p className="text-[#1C2C39] dark:text-white text-[36px] font-medium">
        {clickResult.word}
      </p>
      <p className="text-[16px] dark:text-[#8D98AB] text-[#B2B2B2] font-regular ml-1">
        {clickResult.engspell}
      </p>
      <p className="text-[#3662E3] text-[42px] sm:text-[52px] font-[600] mt-2">
        {clickResult.viespell}
      </p>
      <p className="text-[18px] dark:text-[#8D98AB] text-[#1C2C39] font-regular ml-1">
        {clickResult.viespell}
      </p>
    </div>
  );
};

export default SearchDisplay;
