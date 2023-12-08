import React from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

type Props = {};

function Header({}: Props) {
  return (
    <div className="border-b border-white/20 bg-white/5">
      <div className="container mx-auto ">
        <div className="justify-between flex py-[12px]">
          <Image
            height={30}
            width={161}
            src="/assets/mainlogo.svg"
            alt="main-logo"
          />
          <div className="flex items-center justify-center space-x-[24px]">
            <Link href={"/"}>Home</Link>
            <Link href={"/mainapp"}>Main App</Link>
            <Link href="/holdings">Holdings </Link>
            <Link target="_blank" href="https://github.com/chiragbadhe/cricdex">
              About Project
            </Link>
          </div>
          <button>
            <ConnectButton />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
