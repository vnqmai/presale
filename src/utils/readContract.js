import abi from "contract/presale.json";
import { ethers } from "ethers";

export async function ReadContract() {
  const contractAddress = "0xEbc71fA80a0B6D41c944Ed96289e530D0A92a31F";
  // const provider = ethers.getDefaultProvider('https://bsc-dataseed.binance.org');
  const provider = ethers.getDefaultProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545/"
  );

  const Contract = new ethers.Contract(contractAddress, abi, provider);

  return Contract;
}
