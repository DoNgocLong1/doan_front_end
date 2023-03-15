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
  width: 50%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border: 1px solid #9bae07;
  border-radius: 1em;
`;
export const GalleryWrapper = styled.div`
  display: flex;
  gap: 1em;
  justify-content: center;
`;
export const GalleryImg = styled(ProductMainImg)`
  width: 10em;
  border: none;
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
`;
export const ProductName = styled.h1`
  max-width: 35em;
  white-space: pre-wrap;
  color: ${color.whiteColor};
  font-size: 2.5em;
`;
export const SpecificationsContainer = styled.ul`
  padding-top: 2em;
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
export const SpecificationName = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  color: ${color.whiteColor};
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
  p {
    font-size: 1.5em;
    color: ${color.whiteColor};
  }
`;
