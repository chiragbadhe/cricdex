import Table from "@/components/Table/Table";
import React from "react";
import { useAccount, useBalance } from "wagmi";

type Props = {};

const columns = [
  { Header: "Rank", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Invested Price", accessor: "investedprice" },
  { Header: "Current Price", accessor: "currentprice" },
  {
    Header: "Percentage",
    accessor: (d: any) => {
      const profitLoss = +d.currentprice - +d.investedprice;
      const percentage = (profitLoss / +d.investedprice) * 100;
      return (
        <span style={{ color: profitLoss >= 0 ? "green" : "red" }}>
          {percentage.toFixed(2)}%
        </span>
      );
    },
  },
  {
    Header: "Trade",
    accessor: "trade",
    Cell: ({ row }: any) => (
      <button
        className="bg-red-400 px-[24px] py-[4px] text-black"
        onClick={() => console.log("test")}
      >
        <span>Sell</span>
      </button>
    ),
  },
];

const data = [
  {
    id: 1,
    name: "Virat Kohli",
    investedprice: 6.67,
    currentprice: 8.33,
    trade: "Sell",
  },
];
function Dashboard({}: Props) {
  return (
    <div className="container mx-auto my-[24px]">
      <div className="">
        <span className="text-[32px] font-bold text-white/80">
          Your Holdings
        </span>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Dashboard;
