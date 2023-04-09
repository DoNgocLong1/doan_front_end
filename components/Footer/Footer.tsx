import images from "@/images";
import {
  ClockCircleOutlined,
  CompassOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import React from "react";
import {
  BrandImg,
  BrandImgWrapper,
  BrandWrapper,
  BusinessInformationsWrapper,
  BusinessSlogan,
  Container,
  IconInforWrapper,
  InforDetail,
  InforLabel,
  InformationsContainer,
  InforWrapper,
  PaymentCardImg,
  PaymentProcedureImg,
  PaymentProcedureWrapper,
  PaymentSubTitle,
  PaymentTitle,
  PaymentWrapper,
  Stick,
  Wrapper,
} from "./Footer.styled";

const Footer = () => {
  return (
    <Container>
      <BrandWrapper>
        <BrandImgWrapper>
          <BrandImg src={images.conceptdBrand.src} alt="brand" title="brand" width="250" height="50" />
        </BrandImgWrapper>
        <BrandImgWrapper>
          <BrandImg src={images.predatorBrand.src} alt="brand" title="brand" width="250" height="50" />
        </BrandImgWrapper>
        <BrandImgWrapper>
          <BrandImg src={images.spatialLabsBrand.src} alt="brand" title="brand" width="250" height="50" />
        </BrandImgWrapper>
        <BrandImgWrapper>
          <BrandImg src={images.planet9Brand.src} alt="brand" title="brand" width="250" height="50" />
        </BrandImgWrapper>
      </BrandWrapper>
      <Stick />
      <Wrapper>
        <BusinessInformationsWrapper>
          <InformationsContainer>
            <BusinessSlogan>Pellentesque posuere orci lobortis</BusinessSlogan>
            <InforWrapper>
              <IconInforWrapper>
                <CompassOutlined />
              </IconInforWrapper>
              <InforLabel>Address: </InforLabel>
              <InforDetail>
                5171 W Campbell Ave undefined Kent, Utah 53127 United States
              </InforDetail>
            </InforWrapper>
            <InforWrapper>
              <IconInforWrapper>
                <PhoneOutlined />
              </IconInforWrapper>
              <InforLabel>Call Us: </InforLabel>
              <InforDetail> (+91) - 540-025-124553 </InforDetail>
            </InforWrapper>
            <InforWrapper>
              <IconInforWrapper>
                <MailOutlined />
              </IconInforWrapper>
              <InforLabel>Email: </InforLabel>
              <InforDetail>sale@Nest.com</InforDetail>
            </InforWrapper>
            <InforWrapper>
              <IconInforWrapper>
                <ClockCircleOutlined />
              </IconInforWrapper>
              <InforLabel>Hours: </InforLabel>
              <InforDetail>10:00 - 18:00, Mon - Sat</InforDetail>
            </InforWrapper>
          </InformationsContainer>
        </BusinessInformationsWrapper>
        <PaymentWrapper>
          <PaymentTitle>App & Payment</PaymentTitle>
          <PaymentSubTitle>From App Store or Google Play</PaymentSubTitle>
          <PaymentProcedureWrapper>
            <PaymentProcedureImg src={images.appStorePaymnet.src} alt="payment" title="payment" width="130" height="45" />
            <PaymentProcedureImg src={images.googlePlayPaymnet.src} alt="payment" title="payment" width="130" height="45" />
          </PaymentProcedureWrapper>
          <PaymentSubTitle>Secured Payment Gateways</PaymentSubTitle>
          <PaymentCardImg src={images.cardPayment.src} alt="payment" title="payment" width="1=250" height="36" />
        </PaymentWrapper>
      </Wrapper>
    </Container>
  );
};

export default Footer;
