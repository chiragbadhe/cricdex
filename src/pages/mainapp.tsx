import GasApis from "@/components/GasApis/GasApi";
import Table from "@/components/Table/Table";
import React, { useEffect, useState } from "react";
import { useContractRead, useContractWrite, useNetwork } from "wagmi";
import { CricDex } from "../abis/CricDex";
import supabase from "@/utils/supabase";
import { parseEther } from "viem";
import { Chain } from "@rainbow-me/rainbowkit";

import { getContractAddress } from "@/utils/getcontractaddress";

type Props = {};

function App({}: Props) {
  const { chain, chains } = useNetwork();
  const contractAddress = getContractAddress(chain?.id as any);

  const { isLoading: DepositLoading, write: deposit } = useContractWrite({
    address: contractAddress as any,
    abi: CricDex,
    functionName: "deposit",
  });

  const [scoreVirat, setScoreVirat] = useState(20);
  const [scoreRohit, setScoreRohit] = useState(10);

  const [tokenToBuyVirat, setTokenToBuyVirat] = useState(0);
  const [tokenToBuyRohit, setTokenToBuyRohit] = useState(0);

  const [tokenDaiToBuyVirat, setTokenDaiToBuyVirat] = useState(0);
  const [tokenDaiToBuyRohit, setTokenDaiToBuyRohit] = useState(0);

  function BuySelectedtoken({ playerId, totalPriceOfShare }: any) {
    console.log(playerId, (scoreRohit / 3) * totalPriceOfShare);

    if (playerId === 1) {
      deposit({
        args: [
          BigInt(playerId),
          parseEther(((scoreVirat / 3) * totalPriceOfShare).toString()),
        ],
      });
    } else if (playerId === 2) {
      deposit({
        args: [
          BigInt(playerId),
          parseEther(((scoreVirat / 3) * totalPriceOfShare).toString()),
        ],
      });
    }
  }

  const columns = [
    { Header: "Rank", accessor: "id" },
    { Header: "Name", accessor: "name" },
    {
      Header: "Score Points",
      accessor: "scorepoints",
      Cell: ({ row }: any) => (
        <PlayerScore
          id={row.original.id}
          Score={
            (row.original.id === 1 && scoreVirat) ||
            (row.original.id === 2 && scoreRohit)
          }
        />
      ),
    },
    {
      Header: "Share Price",
      accessor: "shareprice",
      Cell: ({ row }: any) => (
        <span>
          {row.original.id === 1
            ? (scoreVirat / 3).toFixed(2)
            : row.original.id === 2
            ? (scoreRohit / 3).toFixed(2)
            : null}
        </span>
      ),
    },
    {
      Header: "Number of Shares To Buy",
      accessor: "tokentobuy",
      Cell: ({ row }: any) => <TokenToBuyInput id={row.original.id} />,
    },
    {
      Header: `Action ${DepositLoading ? "loading" : ""}`,
      accessor: "action",
      Cell: ({ row }: any) => (
        <button
          className="bg-green-400 px-[24px] py-[4px] text-black"
          onClick={() =>
            BuySelectedtoken({
              playerId: row.original.id,
              totalPriceOfShare:
                (row.original.id === 1 && tokenToBuyVirat) ||
                (row.original.id === 2 && tokenToBuyRohit),
            })
          }
        >
          <span>Buy</span>
        </button>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      name: "Virat Kohli",
    },
    {
      id: 2,
      name: "Rohit Sharma",
    },
  ];

  function TokenToBuyInput({ id }: any) {
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
        <div className="text-purple-500">
          ~{" "}
          {(id === 1 && tokenDaiToBuyVirat) || (id === 2 && tokenDaiToBuyRohit)}{" "}
          Dai{" "}
        </div>
      </div>
    );
  }

  function PlayerScore({ id }: any) {
    const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      (id === 1 && setScoreVirat(event.target.value as any)) ||
        (id === 2 && setScoreRohit(event.target.value as any));
    };

    const inputValue = (id === 1 && scoreVirat) || (id === 2 && scoreRohit);

    return (
      <>
        <input
          type="number"
          value={inputValue.toString()}
          className="bg-transparent outline-none py-[4px] w-[100px]"
          onChange={handleTokenChange}
          placeholder={inputValue.toString()}
        />
      </>
    );
  }

  return (
    <div className="my-[25px] container mx-auto ">
      <span className="text-[32px] font-bold text-white/80">Buy Tokens</span>
      <GasApis />
      <Table columns={columns} data={data} />{" "}
    </div>
  );
}

export default App;
