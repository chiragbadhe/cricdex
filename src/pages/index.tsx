import { Router, useRouter } from "next/router";

export default function Home() {
  const Router = useRouter();

  return (
    <main>
      <div className="container mx-auto flex items-center  h-screen -mt-[50px]">
        <div className="w-1/2 flex flex-col ">
          <div className="flex pb-[10px]">
            <p className="px-[24px] py-[6px] bg-[#71FF4C]/10 border border-[#71FF4C]/30 text-[#71FF4C]/60">
              Future of Fantacy Cricket
            </p>
          </div>
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
              onClick={() => Router.push("/mainapp")}
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
