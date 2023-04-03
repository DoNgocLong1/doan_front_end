import color from "@/utils/color";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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