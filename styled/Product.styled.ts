import breakPoints from "@/constants/breakpoint";
import color from "@/utils/color";
import styled from "styled-components";
export const Container = styled.div`
  background-color: ${color.backgroundColor} !important;
  width: 100%;
  display: flex;
  padding-bottom: 2em;
  flex-direction: column;
  color: ${color.whiteColor};
`;
export const BannerWrapper = styled.div`
  height: 40em;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  @media ${breakPoints.mobile} {
    height: fit-content;
  }
`;
export const Banner = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const BannerTitle = styled.h1`
  font-size: 5em;
  position: absolute;
  top: 1.5em;
  left: 1.5em;
  color: ${color.whiteColor};
  @media ${breakPoints.mobile} {
    font-size: 3em;
    top: 1em;
    left: 1em;
  }
`;
export const ProductContainer = styled.div`
  width: 100%;
  padding: 3em 0;
  display: flex;
`;
export const SideBarContainer = styled.div`
  flex: 1;
  transition: 0.25s ease;
  @media ${breakPoints.mobile} {
    width: 70%;
    height: 100%;
    flex: unset;
    position: fixed;
    top: 5em;
    left: 0;
    z-index: 90;
    transform: ${(props: { isShow: boolean }) =>
    props.isShow ? "translateX(0)" : "translateX(-100%)"};
  }
`;
export const ListProductContainer = styled.div`
  flex: 4;
  padding: 0 2em;
  z-index: 10;
`;
export const Overlay = styled.div`
  display: none;
  @media ${breakPoints.mobile} {
    display: ${(props: { isShow: boolean }) =>
    props.isShow ? "block" : "none"};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.8;
    z-index: 50;
  }
`;
