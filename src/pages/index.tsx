import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import Table from "@/components/Table/Table";
import UserCard from "@/components/UserCard/UserCard";
import { useState } from "react";
import Link from "next/link";
import { Router, useRouter } from "next/router";

export default function Home() {
  const Router = useRouter();

  return (
    <main>
      <div className="container mx-auto flex items-center  h-screen -mt-[50px]">
        <div className="w-1/2 flex flex-col ">
          <p className="text-[60px] font-bold leading-[64px] pr-[50px]">
            <span>Buy Stocks in Cricket Players</span>{" "}
            <span className="text-[#71FF4C]"> Win Big Profits</span>
          </p>
          <p className="mt-[24px] opacity-70">
            Revolutionizing fantasy cricket with blockchain innovation. Invest
            in player shares, experience the thrill of performance-driven
            markets, and redefine how you engage with the game. Join the future
            of sports trading!
          </p>

          <div>
            <button
              onClick={() => Router.push("/app")}
              className="px-[24px] py-[12px] bg-[#71FF4C] text-black mt-[24px]"
            >
              Launch App
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <img src="/assets/fantacy-cricket.svg" alt="" />
        </div>
      </div>
    </main>
  );
}
