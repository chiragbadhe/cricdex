import React from "react";

type Props = {};

function howthisworks({}: Props) {
  return (
    <div>
      <div>
        <div className="container mx-auto flex flex-col space-y-[12px] w-1/2 opacity-60 py-[30px]">
          <span className="text-[24px]">About Project</span>
          <span>
            CricDex is a revolutionary fantasy game where you can buy and sell
            fantasy stocks in cricket players. The better the player plays on
            the pitch, the price goes up and vice versa. Your role is to predict
            the future performance of the players and build a portfolio
            accordingly.
          </span>
          <span>
            You can buy fantasy stocks at the quoted buy price, track how the
            price changes as games go on, and sell your fantasy stocks at the
            quoted sell price.
          </span>
          <span>
            Remember, prices are determined by player performance, so CricDex is
            a game that requires immense cricket knowledge, judgement and
            financial skill to win.
          </span>
        </div>
      </div>
    </div>
  );
}

export default howthisworks;
