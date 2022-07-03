import bnb from "assets/bnb.png";
import busd from "assets/busd.png";
import usdt from "assets/usdt.png";
import { Context } from "context/contex";
import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { ErrorHandling } from "utils/errorHandling";
import { SortOption, SortSelect } from "./styled";
// import { Contract } from "utils/useContract"
import { ReadContract } from "utils/readContract";

export default function SelectToken() {
  const { setSelectedToken, setSelectedTokenPrice, setLoading } =
    useContext(Context);
  const supportedTokens = [
    {
      tokenAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56", // BUSD
      priceFeed: "0xcBb98864Ef56E9042e7d2efef76141f15731B82f", // BUSD/USD
    },
    {
      tokenAddress: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3", // DAI
      priceFeed: "0x132d3C0B1D2cEa0BC552588063bdBb210FDeecfA", // DAI/USD
    },
    {
      tokenAddress: "0x55d398326f99059fF775485246999027B3197955", // USDT
      priceFeed: "0xB97Ad0E74fa7d920791E90258A6E2085088b4320", // USDT/USD
    },
    {
      tokenAddress: "0x2170ed0880ac9a755fd29b2688956bd959f933f8", // ETH
      priceFeed: "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e", // ETH/USD
    },
  ];

  const handleSelectToken = async (value) => {
    setSelectedToken(value);
    try {
      setLoading(true);
      const contract = await ReadContract();

      if (value === "bnb") {
        const data = await contract.getPrice();
        console.log(ethers.utils.formatUnits(data, 8));
        const price = Number(ethers.utils.formatUnits(data, 8));
        setSelectedTokenPrice(price);
        setLoading(false);
      } else {
        const data = await contract.getPriceToken(value);
        console.log(ethers.utils.formatUnits(data, 8));
        const price = Number(ethers.utils.formatUnits(data, 8));
        setSelectedTokenPrice(price);
        setLoading(false);
      }
    } catch (error) {
      ErrorHandling(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSelectToken("bnb");
  }, []);

  return (
    <SortSelect
      placeholder="Select a token"
      defaultValue="bnb"
      style={{ width: "40%" }}
      dropdownStyle={{
        color: "#fff",
        backgroundColor: "#1c274f",
      }}
      onChange={handleSelectToken}
    >
      <SortOption value="bnb">
        <img src={bnb} alt="bnb" width="24" />
        <span style={{ marginLeft: "10px", color: "#fff" }}>BNB</span>
      </SortOption>
      <SortOption value={supportedTokens[0].tokenAddress}>
        <img src={busd} alt="bnb" width="24" />
        <span style={{ marginLeft: "10px", color: "#fff" }}>BUSD</span>
      </SortOption>
      <SortOption value={supportedTokens[2].tokenAddress}>
        <img src={usdt} alt="bnb" width="24" />
        <span style={{ marginLeft: "10px", color: "#fff" }}>USDT</span>
      </SortOption>
    </SortSelect>
  );
}
