import breakPoints from "@/constants/breakpoint";
import color from "@/utils/color";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${color.footerColor};
  padding: 1em;
  @media ${breakPoints.mobile} {
    font-size: 8px;
  }
`;
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3em;
`;
export const BrandWrapper = styled(Wrapper)`
  flex-wrap: wrap;
`;
export const BrandImgWrapper = styled.div`
  @media ${breakPoints.mobile} {
    flex-basis: 45%;
  }
`;
export const BrandImg = styled.img`
  width: 25em;
  height: 100%;
  object-fit: contain;
  filter: invert(83%) sepia(9%) saturate(13%) hue-rotate(102deg)
    brightness(100%) contrast(89%);
  &:hover {
    filter: invert(100%) sepia(33%) saturate(3653%) hue-rotate(173deg)
      brightness(123%) contrast(105%);
  }
  @media ${breakPoints.mobile} {
    width: 15em;
  }
`;
export const Stick = styled.hr`
  background-color: #3a3b3c;
  border: 0;
  height: 1px;
  width: 80%;
`;
export const BusinessInformationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
`;
export const BusinessSlogan = styled.p`
  font-size: 2.5em;
  color: ${color.whiteColor};
`;
export const InformationsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  color: ${color.whiteColor};
`;
export const IconInforWrapper = styled.div`
  font-size: 2em;
`;
export const InforWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;
export const InforLabel = styled.label`
  font-size: 1.5em;
  font-weight: bold;
`;
export const InforDetail = styled.p`
  font-size: 1.5em;
`;
export const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
`;
export const PaymentTitle = styled.h1`
  font-size: 2.5em;
  color: ${color.whiteColor};
`;
export const PaymentSubTitle = styled.p`
  font-size: 1.5em;
  color: ${color.whiteColor};
`;
export const PaymentProcedureWrapper = styled.div`
  display: flex;
  gap: 2em;
  justify-content: center;
  align-items: center;
`;
export const PaymentProcedureImg = styled.img`
  width: 13em;
  height: 100%;
  object-fit: contain;
`;
export const PaymentCardImg = styled.img`
  height: 100%;
  width: 25em;
  object-fit: contain;
`;
