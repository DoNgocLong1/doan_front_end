import breakPoints from "constants/breakpoint";
import styled from "styled-components";
import color from "utils/color";
export const Container = styled.div`
  background-color: ${color.backgroundColor} !important;
  width: 100%;
  @media ${breakPoints.tablet} {
    padding: 0;
    font-size: 8px;
  }
  @media ${breakPoints.mobile} {
    padding: 0;
    font-size: 5px;
  }
`;
export const BannerWrapper = styled.div`
  margin-top: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  padding: 1em;
  width: 100%;
`;
export const Banner = styled.div`
  background-color: ${color.backgroundItemColor};
  position: relative;
  flex-basis: 32%;
  height: 25em;
  overflow: hidden;
`;
export const BannerImg = styled.img`
  position: absolute;
  width: 25em;
  object-fit: cover;
  bottom: 0;
  right: 0;
  z-index: 1;
`;
export const BannerDescription = styled.div`
  display: flex;
  position: absolute;
  top: 2em;
  left: 2em;
  flex-direction: column;
  color: #fff;
  z-index: 2;
`;
export const BannerTitle = styled.h1`
  font-size: 2em;
`;
export const BannerContent = styled.p`
  font-size: 1.5em;
`;
export const ShopNowButton = styled.button`
  background-color: transparent;
  position: absolute;
  bottom: 2em;
  left: 2em;
  border: 0.1em solid ${color.whiteColor};
  border-radius: 0.5em;
  color: ${color.whiteColor};
  font-size: 1.5em;
  font-weight: 700;
  padding: 0.7em 1.3em;
  transition: all 0.2s linear;
  z-index: 2;
  &:hover {
    background-color: ${color.whiteColor};
    color: #000;
  }
`;
export const BrowserCategory = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
export const BrowserCategories = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2em;
  padding: 2em;
  flex-direction: column;
  padding-top: 5em;
  @media ${breakPoints.mobile} {
    padding: 0 0;
  }
`;
export const BrowserCategoriesTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  color: ${color.whiteColor};
`;
export const CategoriesWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 3.2em 2em 0 2em;
  gap: 2em;
  flex-wrap: wrap;
`;
export const CategoryTitle = styled.span`
  text-align: center;
  width: 100%;
  padding: 0.5em;
  background-color: #26ad60;
  font-size: 1.5em;
  color: #000;
  font-weight: bold;
  align-self: flex-end;
  z-index: 1;
`;
export const CategoryItemImg = styled.img`
  transition: 0.3s ease;
  width: 100%;
  color: ${color.whiteColor};
  @media ${breakPoints.mobile} {
    width: 25em;
  }
`;
export const CategoryItemImgWrapper = styled.div`
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transition: 0.3s ease;
  background-color: ${color.backgroundColor};
`;
export const CategoryItem = styled.div`
  min-height: 30em;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  position: relative;
  @media ${breakPoints.tablet} {
    flex: unset;
    flex-basis: 30%;
  }
  @media ${breakPoints.mobile} {
    flex: unset;
    flex-basis: 48%;
  }
  &:hover {
    ${CategoryItemImgWrapper} {
      background-color: ${color.backgroundItemColor};
      transform: translateY(-3.5em);
      border-top: 0.5em solid #26ad60;
    }
    ${CategoryItemImg} {
      transform: scale(1.2);
    }
  }
`;
export const PopularProductWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em 5em;
  @media ${breakPoints.mobile} {
    padding: 0.5em;
  }
`;
export const PopularProductHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2em 1em;
`;
export const PopularProductTitle = styled.div`
  font-size: 3em;
  color: ${color.whiteColor};
  white-space: nowrap;
`;
export const FilterWrapper = styled.div``;
