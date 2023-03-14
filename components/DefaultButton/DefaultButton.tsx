import React from "react";
import styled from "styled-components";
import color from "utils/color";
const Button = styled.button`
  background-color: initial;
  border: 0.3em solid ${color.whiteColor};
  border-radius: 0.5em;
  color: ${color.whiteColor};
  font-size: 1.5em;
  font-weight: 700;
  padding: 1em 2em;
  transition: all 0.2s linear;
`;
interface IButton {
  text: string;
}
const DefaultButton = ({ text }: IButton) => {
  return <Button>{text}</Button>;
};

export default DefaultButton;
