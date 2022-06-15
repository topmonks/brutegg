import window from "./window";
let web3;
export default function getWeb3() {
  if (!web3) {
    web3 = new window.Web3(window.ethereum);
  }

  return web3;
}

export function composeNonce(message, dateISOString) {
  return [message, dateISOString].join(", ");
}
