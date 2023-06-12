import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import {
  Container,
  LoginWrapper,
  LoginTitle,
  LoginFeatureLogin,
  ForgotPassword,
  Registry,
  ButtonWrapper,
  ErrorMessage,
  LoginButton,
} from "../../styled/Login.styled";
import { UserOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons/lib/icons";
import { instance } from "@/apiServices/instance";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/auth/authSlice";
import { setCookie } from "@/helper";
import Head from "next/head";
const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const onFinish = async (values: any) => {
    const loginData: any = {
      email: values.username,
      password: values.password,
    };
    await instance
      .post("login", loginData)
      .then((res) => {
        if (res.data.errCode !== 0) {
          console.log("login failed");
          return;
        }
        localStorage.setItem("token", res.data.token);
        setCookie('token', res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data.userData));
        router.push("/");
        dispatch(loginSuccess(res.data.userData))
      })
      .catch((e) => {
        console.log(e);
        setError("username or password incorrect");
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Head>
        <meta data-n-head="ssr" data-hid="description" name="description" content="login page" />
        <link
          data-n-head="ssr"
          data-hid="i18n-can"
          rel="canonical"
          href=''
        />
        <title>Predator Login</title>
      </Head>
      <Container>
        <LoginWrapper>
          <LoginTitle>Welcome to Predator</LoginTitle>
          <Form
            layout="horizontal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              hasFeedback
              rules={[
                { required: true, message: "Please input your email!" },
                { max: 200, message: "please input less than 200 characters" },
                { type: 'email', message: "Email invalid" }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
              rules={[
                { required: true, message: "Please input your password!" },
                { max: 200, message: "please input less than 200 characters" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <LoginFeatureLogin>
              <Link href="/">
                <ForgotPassword>Start Purchase</ForgotPassword>
              </Link>
              <Link href="/registry">
                <Registry>Registry</Registry>
              </Link>
            </LoginFeatureLogin>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonWrapper name="submit" wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </ButtonWrapper>
          </Form>
        </LoginWrapper>
      </Container>
    </>
  );
};
export default Login;
