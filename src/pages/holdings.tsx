import { CricDex } from "@/abis/CricDex";
import Table from "@/components/Table/Table";
import React, { useState } from "react";
import { getContractAddress } from "@/utils/getcontractaddress";
import { useContractWrite, useNetwork } from "wagmi";
import { parseEther } from "viem";

type Props = {};

function Dashboard({}: Props) {
  const { chain } = useNetwork();
  const contractAddress = getContractAddress(chain?.id as any);
  const { isLoading: WithdrawLoading, write: withdraw } = useContractWrite({
    address: contractAddress as any,
    abi: CricDex,
    functionName: "withdraw",
  });

  const [tokenToBuyVirat, setTokenToBuyVirat] = useState(0);
  const [tokenToBuyRohit, setTokenToBuyRohit] = useState(0);

  function TokenToSellInput({ id }: any) {
    const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      (id === 1 && setTokenToBuyVirat(event.target.value as any)) ||
        (id === 2 && setTokenToBuyRohit(event.target.value as any));
    };

    const inputValue =
      (id === 1 && tokenToBuyVirat) || (id === 2 && tokenToBuyRohit);
    return (
      <div className="flex justify-between ">
        <input
          type="number"
          value={inputValue.toString()}
          className="bg-transparent outline-none py-[4px] w-[200px]"
          onChange={handleTokenChange}
          placeholder="Enter number of shares"
        />
      </div>
    );
  }

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
      Header: "Tokens to sell",
      accessor: "amounttosell",
      Cell: ({ row }: any) => <TokenToSellInput id={row.original.id} />,
    },
    {
      Header: "Trade",
      accessor: "trade",
      Cell: ({ row }: any) => (
        <button
          className="bg-red-400 px-[24px] py-[4px] text-black"
          onClick={() => SellSelectedtoken(1)}
        >
          <span>Sell</span>
        </button>
      ),
    },
  ];

  function SellSelectedtoken({ playerId }: any) {
    console.log(playerId);
    withdraw({
      args: [BigInt(1), parseEther("16.66")],
    });
  }

  const data = [
    {
      id: 1,
      name: "Virat Kohli",
      investedprice: 6.67,
      currentprice: 8.33,
      trade: "Sell",
    },
  ];

  return (
    <div className="container mx-auto my-[24px]">
      <div className="">
        <span className="text-[32px] font-bold text-white/80">
          Your Holdings {WithdrawLoading ? "Loading..." : ""}
        </span>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Dashboard;
