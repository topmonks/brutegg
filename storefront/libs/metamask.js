import { GANACHE_ID, METAMASK, POLYGON } from "./constants";
import window from "./window";

export function isCorrectChain(chainId) {
  const correctChainIds = [POLYGON.testChainId, POLYGON.chainId];
  if (process.env.NODE_ENV === "development") {
    correctChainIds.push(GANACHE_ID);
  }
  return correctChainIds.includes(chainId);
}

/**
 *
 * @description
 * wallet_requestPermissions request used to allow users to choose between
 * metamask accounts everytime they click on 'Connect wallet' button
 *
 * this request is not available on metamask mobile, threrefore try-catch
 * @returns {string}
 */
export async function requestAccounts(requestPermissions = false) {
  try {
    if (requestPermissions) {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
    }
  } catch (e) {
    // Metamask mobile
  }
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
}

export async function optionallySwitchToPolygonChain() {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });

  if (chainId !== POLYGON.chainId) {
    try {
      await switchToPolygonChain();
    } catch (switchError) {
      if (switchError.code === METAMASK.ERROR.CHAIN_NOT_AVAILABLE) {
        await addPolygonChain();
      } else {
        throw switchError;
      }
    }
  }
}

export function switchToPolygonChain() {
  return window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: POLYGON.chainId }],
  });
}

export function addPolygonChain() {
  return window.ethereum.request({
    method: "wallet_addEthereumChain",

    params: [
      {
        chainId: POLYGON.chainId,
        chainName: "Polygon Mainnet",
        rpcUrls: ["https://polygon-rpc.com"],
        nativeCurrency: {
          name: "Matic Token",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com/"],
      },
    ],
  });
}
