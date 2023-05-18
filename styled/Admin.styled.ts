import color from "@/utils/color";
import styled from "styled-components";

export const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5em 1em;
  gap: 2em;
  flex-direction: column;
    background-color: ${color.backgroundColor};
  form {
    background-color: ${color.backgroundItemColor};
    padding: 20px 30px;

  }
  .ant-input {
    width: 30em;
  }
  .ant-form-item-label label {
    color: ${color.whiteColor};
    min-width: 12em;
  }
  .ant-input-disabled {
    color: ${color.whiteColor};
  }
  .ant-col {
    width: fit-content;
  }
`;
export const AdminContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  padding: 5em;
  flex-wrap: wrap;
  font-size: 10px;
`;
export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const AdminSection = styled.div`
  flex-basis: 30%;
  height: 300px;
  background-color: ${color.backgroundItemColor};
  border: 1px solid ${color.whiteColor};
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 30px rgba(225, 225, 225, 0.7);
  }
`;
export const SectionInner = styled.div`
  padding: 2em;
  width: 100%;
  min-height: 100%;
  position: relative;
  overflow: hidden;
`;
export const AdminImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  object-fit: cover;
`;
export const Button = styled.button`
  position: absolute;
  right: 1em;
  bottom: 1em;
  font-size: 1.5em;
  background-color: initial;
  border: 0.1em solid ${color.whiteColor};
  border-radius: 0.5em;
  color: ${color.whiteColor};
  font-weight: 700;
  padding: 0.5em;
  transition: all 0.2s linear;
  cursor: pointer;
  &:hover {
    background-color: ${color.whiteColor};
    color: #000;
  }
`;
export const FeatureWrapper = styled(FlexCenter)`
  flex: 1;
  gap: 1.5em;
  font-size: 2em;
  cursor: pointer;
`;
