import React, { useState } from "react";
import {
  AccountContainer,
  Container,
  Feature,
  FeatureWrapper,
  Sidebar,
  SidebarContainer,
  SidebarHeader,
  SidebarHeaderImg,
  SidebarInfoWrapper,
  UserEmail,
  UserName,
} from "./Account.styled";
import { Button, DatePicker, Form, Input, Upload } from "antd";
import ChangePass from "./components/ChangePass/ChangePass";
import { PlusOutlined } from "@ant-design/icons";
import { updateUserProfile } from "@/apiServices/userServices";
const Account = () => {
  const [isProfileComponent, setIsProfileComponent] = useState<boolean>(true);
  const onFinish = async (values: any) => {
    console.log(values.avatar);
    const date = `${values.date?.$y}-${values.date?.$M + 1}-${values.date?.$D}`;
    const formData = {
      name: values.username,
      phone: values.phoneNumber,
      address: values.address,
      date_of_birth: date,
    };
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
    updateUserProfile(formData, config);
  };
  let user: any;
  let userData: any;
  if (typeof window !== 'undefined') {
    user = localStorage.getItem("user");
    userData = JSON.parse(user || "");
  }
  
  return (
    <Container>
      <Sidebar>
        <SidebarContainer>
          <SidebarHeader>
            <SidebarHeaderImg src={"userData.user_img"} />
            <SidebarInfoWrapper>
              <UserName>{userData?.name || ""}</UserName>
              <UserEmail>{userData?.email || ""}</UserEmail>
            </SidebarInfoWrapper>
          </SidebarHeader>
        </SidebarContainer>
        <FeatureWrapper>
          <Feature onClick={() => setIsProfileComponent(true)}>Profile</Feature>
          <Feature onClick={() => setIsProfileComponent(false)}>
            Change Password
          </Feature>
        </FeatureWrapper>
      </Sidebar>
      <AccountContainer>
        {!isProfileComponent ? (
          <ChangePass />
        ) : (
          <Form layout="horizontal" size="large" onFinish={onFinish}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { whitespace: true, message: "Please input your full name!" },
                { max: 200, message: "Please input less than 200 characters" },
              ]}
            >
              <Input placeholder="Username" defaultValue={userData?.name} />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input
                placeholder="Email"
                disabled
                defaultValue={userData?.email}
              />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input placeholder="Address" defaultValue={userData?.address} />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="PhoneNumber"
              rules={[
                { max: 10, message: "Phone number is less than 10 numbers" },
              ]}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
            <Form.Item name="date" label="Date of birth">
              <DatePicker defaultValue={userData?.date_of_birth} />
            </Form.Item>
            <Form.Item label="Upload Avatar" name="avatar">
              <Upload listType="picture-card">
                <PlusOutlined />
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Button</Button>
            </Form.Item>
          </Form>
        )}
      </AccountContainer>
    </Container>
  );
};

export default Account;
