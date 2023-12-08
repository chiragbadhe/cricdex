/* eslint-disable @next/next/no-img-element */
import React from "react";
import RankBadge from "./RankBadge";

type Props = {
  RankNumber: number;
  PlayerName: any;
  Country: any;
  Team: any;
  Image: any;
};

function UserCard({ RankNumber, PlayerName, Country, Team, Image }: Props) {
  return (
    <div className="h-[350px] relative w-[250px] border border-white/10 bg-white/10 flex items-center flex-col justify-center space-y-[24px]">
      <RankBadge RankNumber={RankNumber} />
      <img
        src={Image}
        className="h-[100px] border w-[100px] rounded-full"
        alt="player-image"
      />
      <div className="flex flex-col items-center space-y-[6px]">
        <span className="text-[24px]">{PlayerName}</span>
        <span className="text-[12px]">{Country}</span>
        <span>{Team}</span>
      </div>
    </div>
  );
}

export default UserCard;
