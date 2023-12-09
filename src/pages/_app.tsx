import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";

import { LightNodeProvider } from "@waku/react";

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  base,
  baseSepolia,
  lineaTestnet,
  scroll,
  scrollSepolia,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Header from "@/components/Header/Header";

const { chains, publicClient } = configureChains(
  [baseSepolia, scrollSepolia, lineaTestnet],
  [
    alchemyProvider({ apiKey: "j0Vohheszw0TdgDtU59JgsNwuKPFhQ8G" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "CrickDex",
  projectId: "352a59ff9b9e31a8864e91b90b71de28",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const NODE_OPTIONS = { defaultBootstrap: true };

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#71FF4C",
          accentColorForeground: "black",
          borderRadius: "none",
        })}
      >
        <LightNodeProvider options={NODE_OPTIONS}>
          <Header />
          <Component {...pageProps} />
        </LightNodeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
