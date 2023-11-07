import React from "react";

export type SceneProps = {
  clickResult: never[];
};

const SearchDisplay = (props: SceneProps) => {
  const { clickResult } = props;

  return (
    <div className="absolute top-1/3 -z-50">
      <p className="text-[#1C2C39] text-[36px] font-medium">
        {clickResult.username}
      </p>
      <p className="text-[16px] text-[#B2B2B2] font-regular ml-1">
        {clickResult.email}
      </p>
      <p className="text-[#3662E3] text-[42px] sm:text-[52px] font-[600] mt-2">
        {clickResult.name}
      </p>
      <p className="text-[18px] text-[#1C2C39] font-regular ml-1">
        {clickResult.phone}
      </p>
    </div>
  );
};

export default SearchDisplay;
