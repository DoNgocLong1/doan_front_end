import color from "@/utils/color";
import { Empty } from "antd";
import styled from "styled-components";
export const EmptyContainer = styled.div`
  justify-content: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 2em 0;
  a {
    text-decoration: none;
    width: fit-content;
  }
  .ant-empty {
    height: 30em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .ant-empty-description {
    color: ${color.whiteColor};
    font-size: 2em;
  }
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
const EmptyCart = () => {
  return (
    <EmptyContainer>
      <Empty description="Your Cart is empty" />
    </EmptyContainer>
  );
};
export default EmptyCart;
