import WalletConnectProvider from "@walletconnect/web3-provider";
import abi from "contract/presale.json";
import { ethers, providers } from "ethers";

export async function ContractTrustWallet() {
  const contractAddress = "0xEbc71fA80a0B6D41c944Ed96289e530D0A92a31F";

  const provider = new WalletConnectProvider({
    rpc: {
      // 56: "https://bsc-dataseed.binance.org"
      97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    },
  });

  await provider.enable();

  const web3Provider = new providers.Web3Provider(provider);
  const signer = web3Provider.getSigner();

  const Contract = new ethers.Contract(contractAddress, abi, signer);

  return Contract;
}
