import Table from "@/components/Table/Table";
import React from "react";
import { useAccount, useBalance } from "wagmi";

type Props = {};

const columns = [
  { Header: "Rank", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Score Points", accessor: "scorepoints" },
  { Header: "Share Price", accessor: "shareprice" },
  { Header: "Trade", accessor: "trade" },
];

const data = [
  {
    id: 1,
    name: "Virat Kolhi",
    scorepoints: 40,
    shareprice: "$100",
    trade: "Buy",
  },
];

function truncateAddress(address: string | any[] | undefined, length: number) {
  if (!address) return "";
  const prefix = address.slice(0, length);
  const suffix = address.slice(-length);
  return `${prefix}...${suffix}`;
}

function Dashboard({}: Props) {
  const { address } = useAccount();

  const truncatedAddress = truncateAddress(address, 6);

  const addresslastSixDigits = address?.slice(-6);

  const {
    data: UserBalance,
    isError,
    isLoading,
  } = useBalance({
    address: address,
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-col space-y-[12px] items-center justify-center pt-[50px] pb-[24px]">
        <div
          style={{ backgroundColor: `#${addresslastSixDigits}` }}
          className="h-[150px] w-[150px] rounded-full border border-white/10"
        ></div>
        <span className="text-[28px]">{truncatedAddress}</span>
      </div>

      <div className="flex space-x-[32px] justify-center text-white/60">
        <div className="flex flex-col bg-white/10 border border-white/20 px-[24px] py-[6px]">
          <span>Balance:</span> <span>{UserBalance?.formatted}</span>
        </div>
        <div className="flex flex-col bg-white/10 border border-white/20 px-[24px] py-[6px]">
          <span>Player Invested:</span> <span>03 players</span>
        </div>
      </div>
      <div className="mt-[24px]">
        <span className="text-[24px]">Shares you own </span>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Dashboard;
