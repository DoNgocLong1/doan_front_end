import color from "utils/color";
import styled from "styled-components";
import { Link } from "react-router-dom";
import breakPoints from "constants/breakpoint";
export const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1em 5em;
  display: flex;
  justify-content: space-between;
  gap: 2em;
  align-items: center;
  z-index: 99;
  background-color: ${color.headerColor};
  box-shadow: 0 0.2em 0.5em #8b8b8b;
  @media ${breakPoints.tablet} {
    font-size: 8px;
  }
  @media ${breakPoints.mobile} {
    font-size: 8px;
    padding: 0.5em;
    gap: 0.5em;
  }
`;
export const LogoWrapper = styled.div`
  display: none;
  @media ${breakPoints.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.3em;
    padding: 0 1em;
    color: ${color.whiteColor};
  }
`;
export const Logo = styled.img`
  width: 14em;
  object-fit: cover;
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(213deg)
    brightness(105%) contrast(101%);
  @media ${breakPoints.mobile} {
    display: none;
  }
`;
export const SearchWrapper = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
`;
export const FeatureWrapper = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${color.whiteColor};
  font-size: 1.7em;
  gap: 1.3em;
  flex: 1;
  @media ${breakPoints.mobile} {
    gap: 0.5em;
  }
`;
export const Feature = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.7em;
  height: 100%;
  cursor: pointer;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const FeatureTitle = styled.div`
  font-size: 1.2em;
  color: ${color.whiteColor};
  @media ${breakPoints.mobile} {
    display: none;
  }
`;
export const UserImg = styled.img`
  width: 2.5em;
  height: 2.5em;
  object-fit: cover;
  border-radius: 50%;
  @media ${breakPoints.mobile} {
    width: 1.5em;
    height: 1.5em;
  }
`;
export const IconWrapper = styled.div`
  font-size: 1.8em;
  cursor: pointer;
  @media ${breakPoints.mobile} {
    font-size: 1.5em;
  }
`;
export const FeatureLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
export const QuantitySpan = styled.div`
  position: absolute;
  background-color: red;
  width: 1.2em;
  height: 1.2em;
  border-radius: 50%;
  top: -0.5em;
  left: 1em;
  @media ${breakPoints.mobile} {
    top: -0.5em;
    left: 0.7em;
  }
`;
export const Quantity = styled.span`
  color: ${color.whiteColor};
  font-size: 0.8em;
`;
export const UserFeature = styled.div`
  background-color: #242526;
  width: 100%;
  padding: 0.5em;
  a {
    color: ${color.whiteColor};
    text-decoration: none;
  }
`;
export const UserFeatureWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  color: ${color.whiteColor};
  transition: 0.25s ease;
  border-radius: 0.3em;
  :hover {
    background-color: ${color.backgroundColor};
  }
`;
export const UserFeatureIcon = styled.div`
  font-size: 1.3em;
`;
export const UserFeatureName = styled.div`
  font-size: 1em;
  white-space: nowrap;
`;
