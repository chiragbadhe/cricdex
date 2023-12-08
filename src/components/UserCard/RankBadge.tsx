import React from "react";
import Image from "next/image";

type Props = {
  RankNumber: number;
};

function RankBadge({ RankNumber }: Props) {
  return (
    <div className="absolute -top-[25px] -left-[35px] rotate-12 flex justify-center">
      <Image height={200} width={80} src="/assets/rank-badge.svg" alt="" />
      <span className="absolute text-[28px] mt-[4px] text-red-400">
        {RankNumber}
      </span>
    </div>
  );
}

export default RankBadge;
