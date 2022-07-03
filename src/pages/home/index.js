import { Form, message, Row } from "antd";
import SelectToken from "components/SelectToken";
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import {
  BtnContribute,
  CardStyled,
  Container,
  FormItem,
  InputStyled,
} from "./styled";

import { Context } from "context/contex";

import SEL from "assets/sel.png";
import { ReactComponent as Swap } from "assets/swap.svg";

import Spinner from "react-spinkit";
import { ErrorHandling } from "utils/errorHandling";
import { Allowance } from "utils/getAllowance";
import { AllowanceTrustWallet } from "utils/getAllowanceTrustWallet";
import { Contract } from "utils/useContract";
import { ContractTrustWallet } from "utils/useContractTrustwallet";
import { Signer } from "utils/useSigner";
import { SignerTrustWallet } from "utils/useSignerTrustwallet";

export default function Home() {
  const contractAddress = "0xEbc71fA80a0B6D41c944Ed96289e530D0A92a31F";
  const {
    selectedToken,
    selectedTokenBalance,
    selectedTokenPrice,
    priceLoading,
    isTrustWallet,
  } = useContext(Context);

  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState("10");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chainId, setChainId] = useState(false);

  useEffect(() => {
    const validate = async () => {
      if (window.ethereum) {
        await window.ethereum
          .request({ method: "eth_chainId" })
          .then((chainId) => {
            if (chainId === "0x38") setChainId(true);
          });
      }
    };
    validate();
  }, []);

  const checkAllowance = async (tokenAddress) => {
    try {
      let allowance;
      if (isTrustWallet) allowance = await AllowanceTrustWallet(tokenAddress);
      if (!isTrustWallet) allowance = await Allowance(tokenAddress);

      if (!Number(allowance._hex)) {
        approve(tokenAddress);
        message.info("Please Approve to spend token!");
      } else {
        handleOrderToken();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrderToken = async () => {
    try {
      // console.log('checkpoint', isTrustWallet)
      let contract;
      setLoading(true);

      if (isTrustWallet) contract = await ContractTrustWallet();
      if (!isTrustWallet) contract = await Contract();

      const data = await contract.orderToken(
        selectedToken,
        ethers.utils.parseUnits(amount, 18),
        slippage
      );

      async function Pending() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const result = await provider.getTransactionReceipt(data.hash);
        try {
          if (result === null) {
            setTimeout(() => {
              Pending();
            }, 2000);
          } else if (result !== null) {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      }

      setTimeout(() => {
        Pending();
      }, 2000);
    } catch (error) {
      if (isTrustWallet) message.error(error.error.message);
      ErrorHandling(error);
      setLoading(false);
    }
  };

  const handleOrderBNB = async () => {
    try {
      setLoading(true);
      let contract;
      if (isTrustWallet) contract = await ContractTrustWallet();
      if (!isTrustWallet) contract = await Contract();

      const data = await contract.order(slippage, {
        value: ethers.utils.parseUnits(amount, 18),
      });

      async function Pending() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const result = await provider.getTransactionReceipt(data.hash);
        try {
          if (result === null) {
            setTimeout(() => {
              Pending();
            }, 2000);
          } else if (result !== null) {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
        }
      }

      setTimeout(() => {
        Pending();
      }, 2000);
    } catch (err) {
      if (isTrustWallet) message.error(err.error.message);
      ErrorHandling(err);
      setLoading(false);
    }
  };

  async function approve(tokenAddress) {
    try {
      let signer;
      let abi = [
        "function approve(address _spender, uint256 _value) public returns (bool success)",
      ];

      setLoading(true);
      if (isTrustWallet) signer = await SignerTrustWallet();
      if (!isTrustWallet) signer = await Signer();

      let TokenContract = new ethers.Contract(tokenAddress, abi, signer);

      const data = await TokenContract.approve(
        contractAddress,
        ethers.utils.parseUnits(Math.pow(10, 18).toString(), 18)
      );

      async function PendingApprove() {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const result = await provider.getTransactionReceipt(data.hash);
          if (result === null) {
            setTimeout(() => {
              PendingApprove();
            }, 2000);
          } else if (result !== null) {
            handleOrderToken();
          }
        } catch (error) {
          setLoading(false);
        }
      }

      setTimeout(() => {
        PendingApprove();
      }, 2000);
    } catch (error) {
      if (isTrustWallet) message.error(error.error.message);
      setLoading(false);
      ErrorHandling(error);
    }
  }

  const handleContribute = () => {
    if (!amount) return message.error("Invalid amount!");
    if (!selectedToken) return message.error("Please select a token");
    if (selectedToken === "bnb") {
      handleOrderBNB();
    } else {
      checkAllowance(selectedToken);
    }
  };

  const EstimateSEL = (amount) => {
    if (!selectedToken) return 0;
    if (slippage === "10") {
      return (amount * selectedTokenPrice) / 0.027;
    }
    if (slippage === "20") {
      return (amount * selectedTokenPrice) / 0.025;
    }
    if (slippage === "30") {
      return (amount * selectedTokenPrice) / 0.021;
    }
  };

  return (
    <Container>
      <br />
      <center>
        <p className="home-title">TOKEN NAME</p>
        <p className="home-sub-title">Token presale event</p>
        <br />
      </center>
      <CardStyled>
        <Form layout="vertical" color="white">
          <FormItem
            label={"Balance: " + Number(selectedTokenBalance).toFixed(3)}
          >
            <InputStyled
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
            <SelectToken />
            {/* {!chainId && <AlertStyled banner message="Please connect to BSC network" type="error" />} */}
          </FormItem>
          <Row justify="center">
            <Swap style={{ marginBottom: "20px" }} />
          </Row>
          <FormItem label="To (estimated)">
            {priceLoading ? (
              <Row justify="center">
                <Spinner name="circle" color="#fac66b" />
              </Row>
            ) : (
              <Row justify="space-between" align="middle">
                <InputStyled
                  readOnly
                  placeholder="0.00"
                  value={EstimateSEL(amount).toFixed(2)}
                />
                <div style={{ width: "35%", display: "inline" }}>
                  <img src={SEL} alt="TOKEN NAME" width="auto" height="32" />
                  <span style={{ color: "#fff", marginLeft: "10px" }}>
                    TOKEN NAME
                  </span>
                </div>
              </Row>
            )}
          </FormItem>
          <BtnContribute
            type="ghost"
            loading={loading}
            onClick={handleContribute}
            // disabled
          >
            Contribute
          </BtnContribute>
        </Form>
      </CardStyled>
    </Container>
  );
}
