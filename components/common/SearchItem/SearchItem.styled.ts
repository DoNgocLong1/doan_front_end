import breakPoints from "@/constants/breakpoint";
import color from "@/utils/color";
import styled from "styled-components";

export const SearchWrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  padding: 1em 2em;
  background-color: #000;
  border-radius: 2.5em;
  color: ${color.whiteColor};
  @media ${breakPoints.mobile} {
    width: 100%;
  }
`;
export const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 1.5em;
  width: 100%;
  background-color: transparent;
  padding: 0.5em 1em;
  color: ${color.whiteColor};
`;
export const IconWrapper = styled.div`
  font-size: 1.8em;
  cursor: pointer;
`;
