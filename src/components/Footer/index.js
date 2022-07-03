import telegram from "assets/telegram.svg";
import fb from "../../assets/fb.svg";
import linkedin from "../../assets/linkedin.svg";
import medium from "../../assets/medium.svg";
import twitter from "../../assets/twitter.svg";
import { BreakLine, Container, Social, Wrapper } from "./styles";

export default function Footer() {
  return (
    <Wrapper>
      <BreakLine />
      <Container>
        {/* <Logo
          alt='bitriel'
          src={bitriel}
        /> */}
        <h1>TOKEN LOGO</h1>
        <Social>
          <a href="#" target="_blank" rel="noreferrer">
            <img src={fb} alt="facebook" width={30} />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <img src={twitter} alt="twitter" width={30} />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <img src={telegram} alt="telegram" width={30} />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <img src={medium} alt="medium" width={30} />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <img src={linkedin} alt="linkedin" width={30} />
          </a>
        </Social>
      </Container>
    </Wrapper>
  );
}
