import GasApis from "@/components/GasApis/GasApi";
import Table from "@/components/Table/Table";
import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { CricDex } from "../abis/CricDex";
import supabase from "@/utils/supabase";

type Props = {};

function App({}: Props) {
  const {
    data: daiToken,
    isError,
    isLoading,
  } = useContractRead({
    address: "0xA52Eb948A20FcfF178210dda04BF01E3B6cc17e2",
    abi: CricDex,
    functionName: "daiToken",
  });

  const [scoreVirat, setScoreVirat] = useState("20");
  const [scoreRohit, setScoreRohit] = useState("10");

  const [buyingTokens, setBuyingTokens] = useState({});

  // const [shareVirat, setShareVirat] = useState();
  // const [shareRohit, setShareRohit] = useState();

  function BuySelectedtoken({ playerId, totalPriceOfShare }: any) {
    console.log(playerId, totalPriceOfShare);
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await supabase
  //       .from("your_table_name")
  //       .select("*");

  //     if (error) {
  //       console.error(error);
  //       return;
  //     }

  //     setData(data);
  //   };

  //   fetchData();
  // }, []);

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
            ? (parseFloat(scoreVirat) / 3).toFixed(2)
            : row.original.id === 2
            ? (parseFloat(scoreRohit) / 3).toFixed(2)
            : null}
        </span>
      ),
    },
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
              totalPriceOfShare: row.original.tokentobuy,
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
    },
    {
      id: 2,
      name: "Rohit Sharma",
    },
  ];

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

  function PlayerScore({ id }: any) {
    const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      (id === 1 && setScoreVirat(event.target.value)) ||
        (id === 2 && setScoreRohit(event.target.value));
    };

    const inputValue = (id === 1 && scoreVirat) || (id === 2 && scoreRohit);

    return (
      <input
        type="number"
        value={inputValue.toString()}
        className="bg-transparent outline-none py-[4px] w-[100px]"
        onChange={handleTokenChange}
        placeholder={inputValue.toString()}
      />
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
