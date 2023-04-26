import breakPoints from "@/constants/breakpoint";
import color from "@/utils/color";
import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 2em 0;
  justify-content: center;
  align-items: center;
`;
export const ProductDetailWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 2em;
  justify-content: center;
  @media ${breakPoints.mobile} {
    flex-direction: column;
  }
`;
export const ProductGalleryWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1em;
  align-items: center;
`;
export const ProductMainImg = styled.img`
  background-color: ${color.backgroundItemColor};
  padding: 1em;
  width: 40em;
  height: 40em;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  border: 1px solid #9bae07;
  border-radius: 1em;
  @media ${breakPoints.mobile} {
    width: 30em;
    height: 30em;
  }
`;
export const GalleryWrapper = styled.div`
  display: flex;
  gap: 1em;
  justify-content: center;
`;
export const GalleryImg = styled(ProductMainImg)`
  width: 10em;
  border: none;
  height: 10em;
  border-radius: 0.2em;
  border: 1px solid inherit;
  &:hover {
    border: 1px solid #9bae07;
  }
`;
export const RateWrapper = styled.div`
  display: flex;
`;
export const RateNumber = styled.span`
  font-size: 1.5em;
  margin: auto 0;
  color: ${color.orange};
`;
export const ProductInfoWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media ${breakPoints.mobile} {
    padding: 1em;
  }
`;
export const ProductName = styled.h1`
  max-width: 35em;
  white-space: pre-wrap;
  color: ${color.whiteColor};
  font-size: 2.5em;
`;
export const SpecificationsContainer = styled.ul`
  padding-top: 2em;
  gap: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
`;
export const SpecificationWrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;
export const AddToCartButton = styled.button`
  color: ${color.whiteColor};
  font-size: 1.5em;
  background-color: ${color.backgroundColor};
  padding: 1em 2em;
  border: 1px solid ${color.whiteColor};
  width: fit-content;
  margin-top: 2em;
  transition: 0.5s ease;
  font-weight: bold;
  border-radius: 15px;
  :hover {
    color: #000;
    background-color: ${color.whiteColor};
  }
`;
export const SpecificationName = styled.p`
  font-size: 2em;
  font-weight: bold;
  color: ${color.whiteColor};
`;
export const ItemPrice = styled(SpecificationName)`
  color: ${color.orange};
`;
export const SpecificationDetail = styled(SpecificationName)`
  opacity: 0.8;
`;
export const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-top: 5em;
  font-size: 1.5em;
  p {
    font-size: 1.5em;
    color: ${color.whiteColor};
  }
`;
export const RecommendContainer = styled.div`
  width: 100%;
  max-width: 1250px;
  margin: 10em auto 0 auto;
`;
export const RecommendProduct = styled.h2`
  color: ${color.whiteColor};
  padding: 1em 0;
  font-size: 5em;
  @media ${breakPoints.mobile} {
    font-size: 2em;
  }
`;
