import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import {
  Container,
  RegistryWrapper,
  RegistryTitle,
  ButtonWrapper,
  ErrorMessage,
} from "../../styled/Registry.styled";
import { UserOutlined } from "@ant-design/icons";
import {
  CopyOutlined,
  DingdingOutlined,
  LockOutlined,
} from "@ant-design/icons/lib/icons";
import { instance } from "@/apiServices/instance";
import { useRouter } from "next/router";
import Head from "next/head";
import { createUser } from "@/apiServices/userServices";
import { IFetchUserData, IUserCreateData, IUserData } from '@/types/index.type';
import Notification from "@/components/Notification";
const Registry = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [error, setError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const onFinish = async (values: any) => {
    const registryData: IUserCreateData = {
      fullName: values.fullname,
      email: values.email,
      password: values.password,
    };
    const registry: any = await createUser(registryData)
    if (registry.status !== 200) {
      setError(registry.data.message)
    } else {
      setError('')
      messageApi.open({
        type: 'success',
        content: 'Registry success',
      });
      setIsSuccess(true);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Head>
        <meta data-n-head="ssr" data-hid="description" name="description" content="product page" />
        <link
          data-n-head="ssr"
          data-hid="i18n-can"
          rel="canonical"
          href=''
        />
        <title>Predator Products</title>
      </Head>
      <Container>
        <Notification
          isActive={isSuccess}
          headerText="Login success"
          mainContent="Create account successfully. Please log in to have the best experiences!"
          buttonText="Ok"
          href="/login"
        />
        {contextHolder}
        <RegistryWrapper>
          <RegistryTitle>Registry to join Predator</RegistryTitle>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="fullname"
              rules={[
                { required: true, message: "Please input your full name!" },
                { max: 200, message: "Please input less than 200 characters" },
              ]}
            >
              <Input prefix={<DingdingOutlined />} placeholder="Full name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { max: 200, message: "Please input less than 200 characters" },
                { type: 'email', message: "Email invalid" }
              ]}
              hasFeedback
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
              rules={[
                { required: true, message: "Please input your password!" },
                { max: 200, message: "Please input less than 200 characters" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="retype_password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please retype your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "Repeat password incorrect!"
                      )
                    );
                  },
                }),
                { max: 200, message: "please input less than 200 characters" },
              ]}
            >
              <Input.Password
                prefix={<CopyOutlined />}
                placeholder="Retype password"
              />
            </Form.Item>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonWrapper name="submit" wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </ButtonWrapper>
          </Form>
        </RegistryWrapper>
      </Container>
    </>
  );
};
export default Registry;
