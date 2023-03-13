import breakPoints from "constants/breakpoint";
import styled from "styled-components";
import images from "assets/images";
import { Link } from "react-router-dom";
import color from "utils/color";
import { Form } from "antd";
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${images.loginBackground});
  background-position: center;
  @media ${breakPoints.mobile} {
    padding: 0;
    font-size: 5px;
  }
  overflow: hidden;
`;

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5em;
  justify-content: center;
  align-items: center;
  padding: 4em 2.5em;
  background-color: ${color.whiteColor};
  border-radius: 2.5em;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  input {
    font-size: 1em !important;
  }
  .ant-input-affix-wrapper {
    padding: 1em 1.5em;
    font-size: 1.3em;
    width: 20em;
  }
  .ant-form-item-control {
    max-width: unset;
  }
  .ant-btn-primary {
    padding: 0.5em 5em;
    height: 100%;
  }
  .ant-form-item-control {
    margin: 0;
  }
  @media ${breakPoints.mobile} {
    .ant-input-affix-wrapper {
      padding: 0.2em 0.5em;
      font-size: 1.3em;
      width: 15em;
    }
    input {
      font-size: 0.8em !important;
    }
  }
`;

export const LoginTitle = styled.h1`
  font-size: 2em;
  color: #000;
  @media ${breakPoints.mobile} {
    font-size: 3.5em;
  }
`;
export const LoginFeatureLogin = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  padding: 1em 0;
`;
export const ButtonWrapper = styled(Form.Item)`
  display: flex;
  justify-content: center;
`;
export const ForgotPassword = styled(Link)`
  font-size: 1em;
  text-decoration: underline;
  color: #474747;
`;

export const Registry = styled(ForgotPassword)`
  color: orange;
  text-decoration: none;
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 1em;
  background-color: transparent;
`;
