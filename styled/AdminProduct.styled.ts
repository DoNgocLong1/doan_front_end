import breakPoints from "@/constants/breakpoint";
import color from "@/utils/color";
import styled from "styled-components";
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
export const ParameterTextArea = styled.textarea`
  width: 100%;
  height: 50em;
  background-color: ${color.whiteColor};
  color: ${color.backgroundColor};
`;
export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Wrapper = styled(FlexCenter)`
  overflow: hidden;
  flex: 1;
`;
export const NameWrapper = styled(FlexCenter)`
  overflow: hidden;
  flex: 3;
`;
export const ProductFeatureWrapper = styled.div`
  display: flex;
  gap: 1em;
  font-size: 2em;
  text-align: center;
`;
