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

export const INFURA_ENDPOINTS = {
  [POLYGON.chainId]: process.env.INFURA_MAINNET,
  [POLYGON.testChainId]: process.env.INFURA_TESTNET,
};

export const RARITY = {
  COMMON: "common",
  UNCOMMON: "uncommon",
  RARE: "rare",
  EPIC: "epic",
  LEGENDARY: "legendary",
};

export const SWELL_PRODUCT_TYPES = {
  PHYSICAL: "physical",
  DIGITAL: "digital",
};

export const SWELL_STOCK_STATUS = {
  OUT_OF_STOCK: "out_of_stock",
  IN_STOCK: "in_stock",
};

export const SWELL_OPTIONS_TYPES = {
  SELECT: "select",
};

export const SWELL_GALLERY_TYPES = {
  YOUTUBE: "youtube",
};
