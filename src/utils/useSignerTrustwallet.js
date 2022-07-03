import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

export async function SignerTrustWallet() {
  const provider = new WalletConnectProvider({
    rpc: {
      // 56: "https://bsc-dataseed.binance.org"
      97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    },
  });

  //  Enable session (triggers QR Code modal)
  await provider.enable();

  const web3Provider = new providers.Web3Provider(provider);

  const signer = web3Provider.getSigner();

  return signer;
}
