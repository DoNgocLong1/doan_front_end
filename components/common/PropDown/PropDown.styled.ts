import breakPoints from "@/constants/breakpoint";
import styled from "styled-components";
interface IPropDown {
  isShow: boolean,
  translateX: string,
}
export const Container = styled.div<IPropDown>`
  display: ${(props) => (props.isShow ? "block" : "none")};
  position: absolute;
  border-radius: 1em;
  overflow: hidden;
  top: 3.45em;
  transform: translateX(${(props) => props.translateX});
  width: fit-content;
  color: #000;
  border-radius: 0.5em;
  @media ${breakPoints.mobile} {
    left: -4em;
  }
`;
