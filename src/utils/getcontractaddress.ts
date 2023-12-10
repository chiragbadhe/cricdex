type ContractAddresses = {
  [key: string]: string;
};

export function getContractAddress(chainId: string): string | undefined {
  const contractAddresses: ContractAddresses = {
    '84531': '0xA52Eb948A20FcfF178210dda04BF01E3B6cc17e2', // CricDex Base-Goerli
    '534351': '0x02E1393d234EABBD58c3dd502f2C899bf31E0e36', // ScrollSepolia
  };

  return contractAddresses[chainId];
}



