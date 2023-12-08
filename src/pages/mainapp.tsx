import Table from "@/components/Table/Table";
import React, { useState } from "react";

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

type Props = {};

function app({}: Props) {
  return (
    <div className="my-[25px] container mx-auto ">
      <span className="text-[32px] font-bold text-white/80">Buy Tokens</span>
      <Table columns={columns} data={data} />{" "}
    </div>
  );
}

export default app;
