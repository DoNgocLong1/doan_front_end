import React, { useEffect, useState } from "react";
import {
  AccountContainer,
  Container,
  DateInput,
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
import { getUser, updateUser, updateUserProfile } from "@/apiServices/userServices";
import ChangePass from "@/components/Account/ChangePass/ChangePass";
import useUser from "@/hooks/useUser";
import { IUserData } from "@/types/index.type";
import type { GetServerSideProps } from 'next'
import { getCookie } from "@/helper";
import { useMutation } from "react-query";
import { message } from 'antd';
export const getServerSideProps = async (contexts: any) => {
  const tokenType = contexts.req.headers.cookie
  const token = getCookie('token', tokenType)
  const fetchUser = await getUser(token)
  if (!token) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      data: fetchUser?.data || {},
    }
  }
}
interface IAccount {
  data: IUserData
}
const Account = ({ data }: IAccount) => {
  const [userData, setUserData] = useState<IUserData>(data)
  console.log(userData)
  const [isProfileComponent, setIsProfileComponent] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();
  const token: string = getCookie('token') || ''
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const reFetchingData = async () => {
    const fetchUser = await getUser(token)
    setUserData(fetchUser?.data || {})
  }
  const postUpdateUser = async (userFormData: IUserData) => {
    updateUser(userFormData, token)
    setIsUpdate(!isUpdate)
  }
  useEffect(() => {
    reFetchingData()
  }, [isUpdate])
  const updateUserMutation = useMutation({
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update user success',
      });
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Update user failed',
      });
    },
    mutationFn: (userFormData: IUserData) => postUpdateUser(userFormData)
  })
  const onFinish = async (values: any) => {
    const avatar: string = values?.avatar?.file?.thumbUrl || ''
    const userFormData: IUserData = {
      fullName: userData.fullName,
      email: userData.email,
      address: userData.address,
      phoneNumber: userData.phoneNumber,
      date: userData.date,
      image: avatar,
    }
    updateUserMutation.mutate(userFormData)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      const file = e?.target?.files?.[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserData(userData => ({ ...userData, [e.target.name]: reader.result as string }));
      }
      reader.readAsDataURL(file)
    } else {
      setUserData(userData => ({ ...userData, [e.target.name]: e.target.value }));
    }
  }
  return (
    <Container>
      {contextHolder}
      <Sidebar>
        <SidebarContainer>
          <SidebarHeader>
            <SidebarHeaderImg src={userData?.image || '/user.png'} />
            <SidebarInfoWrapper>
              <UserName>{userData?.fullName || ""}</UserName>
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
                value={userData.fullName || ''}
                placeholder="Full name"
                name="fullName"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                placeholder="Email"
                value={userData.email || ''}
                disabled
              />
            </Form.Item>
            <Form.Item label="Address">
              <Input
                value={userData.address || ''}
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
                value={userData.phoneNumber || 0}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="Date of birth">
              <DateInput
                type="date"
                value={userData.date || ''}
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
