import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Table from "@/components/Table/Table";
import UserCard from "@/components/UserCard/UserCard";
import { useState } from "react";

const columns = [
  { Header: "Rank", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Score Points", accessor: "scorepoints" },
  { Header: "Share Price", accessor: "shareprice" },
  {
    Header: "Number of Shares To Buy",
    accessor: "tokentobuy",
    Cell: ({ row }: any) => (
      <TokenToBuyInput tokenNumber={row.original.tokentobuy} />
    ),
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ row }: any) => (
      <button
        className="bg-green-400 px-[24px] py-[4px] text-black"
        onClick={() =>
          BuySelectedtoken({
            playerId: row.original.id,
            numberOfTokenToBuy: row.original.tokentobuy,
          })
        }
      >
        Buy
      </button>
    ),
  },
];

const data = [
  {
    id: 1,
    name: "Virat Kohli",
    image: "/assets/virat_kohli.jpg",
    country: "India",
    Team: "Royal Challengers Bangalore",
    scorepoints: 10,
    shareprice: "$2",
    trade: "Buy",
  },
  {
    id: 2,
    name: "Rohit Sharma",
    image: "/assets/rohit_sharma.jpg",
    country: "India",
    Team: "Mumbai Indians",
    scorepoints: 10,
    shareprice: "$2",
    trade: "Buy",
  },
  {
    id: 3,
    name: "Hardik Pandya",
    image: "/assets/hardik_pandya.jpg",
    country: "India",
    Team: "Mumbai Indians",
    scorepoints: 10,
    shareprice: "$2",
    trade: "Buy",
  },
  {
    id: 4,
    name: "Jasprit Bumrah",
    image: "/assets/jasprit_bumrah.jpg",
    country: "India",
    Team: "Mumbai Indians",
    scorepoints: 10,
    shareprice: "$2",
    trade: "Sell",
  },
  {
    id: 5,
    name: "KL Rahul",
    image: "/assets/kl_rahul.jpg",
    country: "India",
    Team: "Punjab Kings",
    scorepoints: 10,
    shareprice: "$2",
    trade: "Buy",
  },
];

function BuySelectedtoken({ playerId, numberOfTokenToBuy }: any) {
  console.log(playerId, numberOfTokenToBuy);

  // return (
  //   <span className="bg-green-400 px-[24px] py-[4px] text-black">Buy</span>
  // );
}

function TokenToBuyInput({ tokenNumber }: any) {
  const [tokens, setTokens] = useState(tokenNumber);

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTokens(event.target.value);
  };

  return (
    <input
      type="number"
      value={tokens}
      className="bg-transparent outline-none py-[4px] w-full"
      onChange={handleTokenChange}
      placeholder="Enter number of shares"
    />
  );
}

export default function Home() {
  const firstThreePlayers = data.slice(0, 3);

  return (
    <main>
      <div className="container mx-auto flex flex-col space-y-[12px] w-1/2 opacity-60 py-[30px]">
        <span>
          CricDex is a revolutionary fantasy game where you can buy and sell
          fantasy stocks in cricket players. The better the player plays on the
          pitch, the price goes up and vice versa. Your role is to predict the
          future performance of the players and build a portfolio accordingly.
        </span>
        <span>
          You can buy fantasy stocks at the quoted buy price, track how the
          price changes as games go on, and sell your fantasy stocks at the
          quoted sell price.
        </span>
        <span>
          Remember, prices are determined by player performance, so CricDex is a
          game that requires immense cricket knowledge, judgement and financial
          skill to win.
        </span>
      </div>

      <div className="container mx-auto ">
        <p className="text-[24px] opacity-80">Raffle Details</p>
        <p className="flex flex-col opacity-70">
          <span>Match: ICC T20</span>
          <span>Deposit Time: 9 Dec to 10 Dec</span>
          <span>Reffle Ends: 15 Dec</span>
        </p>
      </div>

      <Table columns={columns} data={data} />
    </main>
  );
}
