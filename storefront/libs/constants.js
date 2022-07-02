export const POLYGON = {
  chainId: "0x89", //137 decimal
  testChainId: "0x13881", //80001 decimal
};

export const POLYGON_EXPLORER = {
  [POLYGON.chainId]: "https://polygonscan.com/tx/",
  [POLYGON.testChainId]: "https://mumbai.polygonscan.com/tx/",
};

export const METAMASK = {
  ERROR: {
    CHAIN_NOT_AVAILABLE: 4902,
  },
};

export const GANACHE_ID = "0x539"; //1337 decimal

export const BRUTE_ADDRESS = {
  [POLYGON.chainId]: process.env.NEXT_PUBLIC_BRUTE_MAINNET,
  [POLYGON.testChainId]: process.env.NEXT_PUBLIC_BRUTE_TESTNET,
};

export const BRUTE_TREASURY_ADDRESS = {
  [POLYGON.chainId]: process.env.NEXT_PUBLIC_BRUTE_TREASURY_MAINNET,
  [POLYGON.testChainId]: process.env.NEXT_PUBLIC_BRUTE_TREASURY_TESTNET,
};

export const RARITY = {
  COMMON: "common",
  UNCOMMON: "uncommon",
  RARE: "rare",
  EPIC: "epic",
  LEGENDARY: "legendary",
};
