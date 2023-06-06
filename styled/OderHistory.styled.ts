import breakPoints from "@/constants/breakpoint";
import color from "@/utils/color";
import styled from "styled-components";

export const Container = styled.div`
  font-size: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  min-height: 100vh;
  padding: 10px;
`;
export const OrderHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;
export const OrderHistoryRow = styled(OrderHistoryContainer)`
  align-items: flex-start;
  flex-direction: row;
  gap: 2em;
`;
export const DetailOrderWrapper = styled.div`
  width: 100%;
  flex: 4;
`;

export const OrderHistoryWrapper = styled.div`
  display: flex;
  padding: 2em 1em;
  width: 100%;
  gap: 1em;
  border-radius: 1em;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${color.backgroundItemColor};
  font-size: 1.7em;
`;
export const ItemWrapper = styled.div`
  display: flex;
  padding: 0 1em;
  width: 100%;
`;
export const ActionButton = styled.button`
  background-color: initial;
  border: 0.1em solid ${color.whiteColor};
  border-radius: 0.5em;
  color: ${color.whiteColor};
  font-size: 1em;
  font-weight: 700;
  padding: 0.5em;
  width: 100%;
  transition: all 0.2s linear;
  &:hover {
    background-color: ${color.whiteColor};
    color: #000;
  }
`;
export const InfoWrapper = styled.div`
  padding: 0 1em;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;
export const GotoProductPage = styled.div`
  color: ${color.whiteColor};
  font-size: 1.5em;
  background-color: ${color.backgroundColor};
  padding: 1em 2em;
  border: 1px solid ${color.whiteColor};
  width: fit-content;
  margin-left: 2em;
  transition: 0.5s ease;
  font-weight: bold;
  :hover {
    color: #000;
    background-color: ${color.whiteColor};
  }
`;
export const HeadingText = styled.h1`
  font-size: 3.5em;
  color: ${color.whiteColor};
  text-align: center;
  width: 100%;
  padding: 1em 0;
`;
