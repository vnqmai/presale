import { Col, Row } from "antd";
import menu from "assets/menu.svg";
import ConnectWallet from "components/ConnectWallet";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  DrawerStyled,
  HeaderItems,
  Item,
  MenuIcon,
  Wrapper,
} from "./styles";

export default function Header() {
  const location = useLocation();
  const [navActive, setNavActive] = useState(false);

  return (
    <Wrapper>
      <Container>
        <Link to="/">
          {/* <Logo alt="bitriel" src={bitriel} /> */}
          <h1>TOKEN LOGO</h1>
        </Link>
        <Row>
          <Col xs={0} sm={0} md={12} lg={12} xl={12}>
            <HeaderItems>
              <Item active={(location.pathname === "/").toString()} to="/">
                Contribute
              </Item>
              <Item
                active={(location.pathname === "/order").toString()}
                to="/order"
              >
                Transactions
              </Item>
              {/* <Item
                active={(location.pathname === "/info").toString()}
                to="/info"
              >
                Status
              </Item> */}
              <Item
                active={(location.pathname === "/mysel").toString()}
                to="/mysel"
              >
                My TOKENNAME
              </Item>
            </HeaderItems>
          </Col>
          <Col>
            <DrawerStyled
              placement="right"
              onClose={() => setNavActive(false)}
              visible={navActive}
            >
              <div style={{ display: "block" }}>
                <Row justify="center">
                  {/* <Logo alt="bitriel" src={bitriel} /> */}
                  <h1>TOKEN LOGO</h1>
                </Row>
                <br />
                <Item
                  mobile="true"
                  active={(location.pathname === "/").toString()}
                  to="/"
                >
                  Contribute
                </Item>
                <Item
                  mobile="true"
                  active={(location.pathname === "/order").toString()}
                  to="/order"
                >
                  Transactions
                </Item>
                {/* <Item
                  mobile="true"
                  active={(location.pathname === "/info").toString()}
                  to="/info"
                >
                  Status
                </Item> */}
                <Item
                  mobile="true"
                  active={(location.pathname === "/mysel").toString()}
                  to="/mysel"
                >
                  My TOKENNAME
                </Item>
              </div>
            </DrawerStyled>
          </Col>
        </Row>
        <ConnectWallet />
        <Col xs={2} sm={2} md={0} lg={0} xl={0}>
          <MenuIcon
            src={menu}
            alt="menu"
            onClick={() => setNavActive(!navActive)}
          />
        </Col>
      </Container>
    </Wrapper>
  );
}
