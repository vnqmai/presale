import { useContext } from "react"
import { Context } from "context/contex"
import { SortOption, SortSelect } from "./styled"
import bnb from 'assets/bnb.png'
import busd from 'assets/busd.png'
import usdt from 'assets/usdt.png'
import dai from 'assets/dai.png'
import eth from 'assets/eth.png'

export default function SelectToken() {
  const { setSelectedToken } = useContext(Context);
  const supportedTokens = [
    {
      tokenAddress: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee", // BUSD
      priceFeed: "0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa" // BUSD/USD
    },
    {
      tokenAddress: "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867", // DAI
      priceFeed: "0xE4eE17114774713d2De0eC0f035d4F7665fc025D" // DAI/USD
    },
    {
      tokenAddress: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd", // USDT
      priceFeed: "0xEca2605f0BCF2BA5966372C99837b1F182d3D620" // USDT/USD
    },
    {
      tokenAddress: "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378", // ETH
      priceFeed: "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7" // ETH/USD
    }
  ]

  const handleSelectToken = (value) => {
    setSelectedToken(value);
  }
  return (
    <SortSelect 
      placeholder="Select a token"
      style={{ width: '40%' }}
      dropdownStyle={{
        color: '#fff',
        backgroundColor: '#1c274f',
      }}
      onChange={handleSelectToken}
    >
      <SortOption value="bnb">
        <img src={bnb} alt='bnb' width='24' />
        <span style={{marginLeft: '10px', color: '#fff'}}>BNB</span>
      </SortOption>
      <SortOption value={supportedTokens[0].tokenAddress}>
        <img src={busd} alt='bnb' width='24' />
        <span style={{marginLeft: '10px', color: '#fff'}}>BUSD</span>
      </SortOption>
      <SortOption value={supportedTokens[2].tokenAddress}>
        <img src={usdt} alt='bnb' width='24' />
        <span style={{marginLeft: '10px', color: '#fff'}}>USDT</span>
      </SortOption>
      <SortOption value={supportedTokens[1].tokenAddress}>
        <img src={dai} alt='bnb' width='24' />
        <span style={{marginLeft: '10px', color: '#fff'}}>DAI</span>
      </SortOption>
      <SortOption value={supportedTokens[3].tokenAddress}>
        <img src={eth} alt='bnb' width='24' />
        <span style={{marginLeft: '10px', color: '#fff'}}>ETH</span>
      </SortOption>
    </SortSelect>
  )
}