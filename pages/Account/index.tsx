import React, { useEffect, useState } from "react";
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
} from "../../styled/Account.styled";
import { Button, DatePicker, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getUser, updateUserProfile } from "@/apiServices/userServices";
import ChangePass from "@/components/Account/ChangePass/ChangePass";
import useUser from "@/hooks/useUser";
import { IUserData } from "@/types/index.type";

const Account = () => {
  const { userData } = useUser()
  const [userGetData, setUserGetData] = useState<IUserData>({
    fullName: '',
    email: '',
    address: '',
    phoneNumber: 0,
    date: '',
    avatar: '',
  })
  useEffect(() => {
    setUserGetData(userData)
  }, [userData])
  const [isProfileComponent, setIsProfileComponent] = useState<boolean>(true);
  const onFinish = async (values: any) => {
    console.log(values.avatar);
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      const file = e?.target?.files?.[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserGetData(userGetData => ({ ...userGetData, [e.target.name]: reader.result as string }));
      }
      reader.readAsDataURL(file)
    } else {
      setUserGetData(userGetData => ({ ...userGetData, [e.target.name]: e.target.value }));
    }
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
          <Form
            layout="horizontal"
            size="large"
            onFinish={onFinish}
          >
            <Form.Item
              label="Full name"
              rules={[
                { whitespace: true, message: "Please input your full name!" },
                { max: 200, message: "Please input less than 200 characters" },
              ]}
            >
              <Input
                value={userGetData.fullName || ''}
                placeholder="Full name"
                name="fullName"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                placeholder="Email"
                value={userGetData.email || ''}
                disabled
              />
            </Form.Item>
            <Form.Item label="Address">
              <Input
                value={userGetData.address || ''}
                placeholder="Address"
                name="address"
                onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="PhoneNumber"
              rules={[
                { max: 10, message: "Phone number is less than 10 numbers" },
              ]}
            >
              <Input
                placeholder="Phone number"
                name="phoneNumber"
                value={userGetData.phoneNumber || 0}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Date of birth">
              <input
                type="date"
                value={userGetData.date || ''}
                name="date"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Upload Avatar" name="avatar">
              <Upload listType="picture-card">
                <PlusOutlined />
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Update</Button>
            </Form.Item>
          </Form>
        )}
      </AccountContainer>
    </Container >
  );
};

export default Account;
