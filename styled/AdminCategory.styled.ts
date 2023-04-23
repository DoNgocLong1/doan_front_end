import breakPoints from "@/constants/breakpoint";
import color from "@/utils/color";
import styled from "styled-components";

export const Container = styled.div`
  padding: 1em;
  background-color: ${color.backgroundColor};
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 70%;
  border: 1px solid ${color.whiteColor};
  border-radius: 10px;
`;
export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CategoryItemHeader = styled.div`
  width: 100%;
  background-color: ${color.whiteColor};
  color: #000;
  padding: 1em 0.5em;
  display: flex;
  font-weight: bold;
  border-radius: 2.5em;
`;
export const CategoryItem = styled(CategoryItemHeader)`
  background-color: ${color.backgroundItemColor};
  color: ${color.whiteColor};
  font-weight: normal;
`;
export const IdWrapper = styled(FlexCenter)`
  flex: 1;
`;
export const CategoryId = styled.p`
  font-size: 1.5em;
`;
export const NameWrapper = styled(FlexCenter)`
  flex: 2;
`;
export const CategoryName = styled(CategoryId)``;
export const ImageWrapper = styled.div`
  flex: 1;
`;
export const CategoryImage = styled.img`
  width: 10em;
  height: 100%;
  object-fit: contain;
`;
export const FileUpload = styled.input`
  display: none !important;
`;
export const PreviewImageWrapper = styled.div`
  width: 10em;
  height: 10em;
  margin: 1em 0;
  border: 1px solid ${color.whiteColor};
  border-radius: 2em;

`;
export const AddIcon = styled.label`
  width: 100%;
  height: 100%;
  color: ${color.whiteColor};
  font-size: 2em !important;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

