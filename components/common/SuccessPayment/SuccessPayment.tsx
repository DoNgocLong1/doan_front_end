import React from "react";

import { Button, Result } from "antd";
import styled from "styled-components";
import color from "@/utils/color";
import Link from "next/link";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${(props: { isShow: boolean }) => (props.isShow ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 100;
  .ant-result {
    z-index: 100;
    background-color: ${color.whiteColor};
  }
`;
const Layout = styled.div`
  background-color: ${color.backgroundColor};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.8;
  display: ${(props: { isShow: boolean }) => (props.isShow ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 99;
`;
interface ISuccessPayment {
  isShow: boolean;
  setIsShow: any;
}
const SuccessPayment = ({ isShow, setIsShow }: ISuccessPayment) => {
  return (
    <Container isShow={isShow}>
      <Layout isShow={isShow} />
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Link key="buy" href="/product">
            <Button onClick={() => setIsShow(false)}>Buy Again</Button>
          </Link>,
        ]}
      />
    </Container>
  );
};

export default SuccessPayment;
