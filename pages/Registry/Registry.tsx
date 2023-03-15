import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import {
  Container,
  RegistryWrapper,
  RegistryTitle,
  ButtonWrapper,
  ErrorMessage,
} from "./Registry.styled";
import { UserOutlined } from "@ant-design/icons";
import {
  CopyOutlined,
  DingdingOutlined,
  LockOutlined,
} from "@ant-design/icons/lib/icons";
import { instance } from "@/apiServices/instance";
import { useRouter } from "next/router";
const Registry = () => {
  const router = useRouter();
  const [error, setError] = useState<string[]>([]);
  const onFinish = async (values: any) => {
    const registryData = {
      name: values.fullname,
      email: values.username,
      password: values.password,
      c_password: values.retype_password,
    };
    console.log(registryData);
    await instance
      .post("register", registryData)
      .then((res) => {
        localStorage.setItem("token", res.data.data.data.token);
        router.push("/");
      })
      .catch((error) => {
        const errorValues = Object.values(error.response.data.data.messages);
        const Errors: any = errorValues.reduce(
          (errArray: any, currentError) => errArray.concat(currentError),
          []
        );
        setError(Errors);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  console.log(error);
  return (
    <Container>
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
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { max: 200, message: "Please input less than 200 characters" },
            ]}
            hasFeedback
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
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
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
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
  );
};
export default Registry;
