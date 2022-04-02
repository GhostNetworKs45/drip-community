import Web3 from "web3";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const networks = {
//     bsc: {
//       chainId: `0x${Number(97).toString(16)}`,
//       chainName: "Binance smart chain",
//       nativeCurrency: {
//         name: "BSC",
//         symbol: "BNB",
//         decimals: 18
//       },
//       rpcUrls: [
//         "https://bsc-dataseed1.binance.org",
//         "https://bsc-dataseed2.binance.org",
//         "https://bsc-dataseed3.binance.org",
//         "https://bsc-dataseed4.binance.org",
//         "https://bsc-dataseed1.defibit.io",
//         "https://bsc-dataseed2.defibit.io",
//         "https://bsc-dataseed3.defibit.io",
//         "https://bsc-dataseed4.defibit.io",
//         "https://bsc-dataseed1.ninicoin.io",
//         "https://bsc-dataseed2.ninicoin.io",
//         "https://bsc-dataseed3.ninicoin.io",
//         "https://bsc-dataseed4.ninicoin.io",
//         "wss://bsc-ws-node.nariox.org"
//       ],
//       blockExplorerUrls: ["https://bscscan.com"]
//     }
//   };
//   const changeNetwork = async ({ networkName }) => {
//     try {
//       if (!window.ethereum) throw new Error("No crypto wallet found");
//       await window.ethereum.request({
//         method: "wallet_addEthereumChain",
//         params: [
//           {
//             ...networks[networkName]
//           }
//         ]
//       });
//     } catch (err) {
//       console.log("not found");
//     }
//   };
//   const handleNetworkSwitch = async (networkName) => {
//     await changeNetwork({ networkName });
//   };
let accounts;

const getAccounts = async () => {
  const web3 = window.web3;
  try {
    accounts = await web3.eth.getAccounts();
    return accounts;
  } catch (error) {
    console.log("Error while fetching acounts: ", error);
    return null;
  }
};
export const loadWeb3 = async () => {
  let isConnected = false;
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      await window.web3.eth.getChainId((err, netId) => {
        // console.log("networkId==>", netId);
        switch (netId.toString()) {
          case "4002":
            isConnected = true;
            break;
          default:
            console.log("wrong netWork");
          // handleNetworkSwitch("bsc")
        }
      });
      if (isConnected == true) {
        let accounts = await getAccounts();
        return accounts[0];
      }
    } else {
      let res = "No Wallet";
      return res;
    }
  } catch (error) {
    let res = "No Wallet";

    return res;
    // console.log("Error while loding web3", error);
  }
};
