import React, { ChangeEvent, useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  DatePicker,
} from 'antd';
import { message } from 'antd';

import { FeatureWrapper, OptionContainer } from '@/styled/Admin.styled';
import { useMutation } from 'react-query';
import { AddIcon, UserId, UserImage, UserItem, UserItemHeader, UserName, Container, FileUpload, IdWrapper, ImageWrapper, NameWrapper, PreviewImage, PreviewImageWrapper, UserText, Wrapper, EmailWrapper } from '@/styled/AdminUser.styled';
import { createUser, getAllUser } from '@/apiServices/userServices';
import { IFetchUserData, IUserCreateData, IUserData } from '@/types/index.type';
import { DateInput } from '@/styled/Account.styled';

export const getServerSideProps = async () => {
  const allUser = await getAllUser()
  return {
    props: {
      allUser: allUser?.data || {}
    }
  }
}
interface IAdminUser {
  allUser: IFetchUserData[]
}
const AdminUser = ({ allUser }: IAdminUser) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userGetData, setUserGetData] = useState<any>({});
  console.log(allUser)
  useEffect(() => {

  }, [])
  const createUserMutation: any = useMutation({
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'create category success',
      });
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'create category failed',
      });
    },
    mutationFn: (userData: IUserCreateData) => createUser(userData)
  })
  /* const deleteUserMutation: any = useMutation({
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'delete category success',
      });
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'delete category failed',
      });
    },
    mutationFn: (id: number) => deleteCategory(id)
  }) */
  const onFinish = async () => {
    const userFormData: IUserCreateData = {
      fullName: userGetData.fullName,
      email: userGetData.email,
      password: userGetData.password,
      address: userGetData.address,
      phoneNumber: userGetData.phoneNumber,
      date: userGetData.date,
      roleId: userGetData?.roleId || 2,
      avatar: userGetData.image,
    }
    createUserMutation.mutate(userFormData)
  };
  /* const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id)
  } */
  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'error',
      content: 'create product failed',
    });
  };


  /* const handleEditUser = async (id: number) => {
    const fetchCategoryData: any = await editCategory(id)
    const { name, image } = fetchCategoryData?.data?.data || {}
    setUserGetData({
      name,
      image
    })
  } */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      const file = e?.target?.files?.[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserGetData((userGetData: any) => ({ ...(userGetData), [e.target.name]: reader.result as string }));
      }
      reader.readAsDataURL(file)
    } else {
      setUserGetData((userGetData: any) => ({ ...userGetData, [e.target.name]: e.target.value }));
    }
  };
  return (
    <>
      <OptionContainer>
        {contextHolder}
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Full name">
            <Input placeholder='input Full name' name="fullName" value={userGetData.fullName || ''} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Email">
            <Input placeholder='input email' name="email" value={userGetData.email || ''} onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder='input password'
              name="password"
              value={userGetData.password || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input placeholder='input address' name="address" value={userGetData.address || ''} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Phone number">
            <Input placeholder='input phone number' name="phoneNumber" value={userGetData.phoneNumber || ''} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Date of birth">
            <DateInput type="date" name="date" value={userGetData.date || ''} onChange={handleChange} />
          </Form.Item>
          {/* <Form.Item label="Select role ID">
            <Select name="roleId" value={userGetData.date} onChange={handleChange}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item> */}
          <Form.Item label="Upload">
            <FileUpload
              type="file"
              id="file"
              name="image"
              onChange={handleChange}

            />
            <PreviewImageWrapper>
              <AddIcon htmlFor="file">
                {userGetData.image ?
                  <PreviewImage
                    src={userGetData.image}
                    alt="preview"
                    title="preview"
                    width="100"
                    height="100"
                  /> : "+"}

              </AddIcon>
            </PreviewImageWrapper>
          </Form.Item>
          <Form.Item label="Button" >
            <Button htmlType="submit">Add user</Button>
          </Form.Item>
        </Form>
        <Container>
          <UserItemHeader>
            <IdWrapper>
              <UserId>ID</UserId>
            </IdWrapper>
            <Wrapper>
              <UserName>
                Name
              </UserName>
            </Wrapper>
            <EmailWrapper>
              <UserId>
                Email
              </UserId>
            </EmailWrapper>
            <Wrapper>
              <UserId>
                Address
              </UserId>
            </Wrapper>
            <Wrapper>
              <UserId>
                Password
              </UserId>
            </Wrapper>
            <Wrapper>
              <UserId>
                Phone number
              </UserId>
            </Wrapper>
            <IdWrapper>
              <UserId>
                Role
              </UserId>
            </IdWrapper>
            <Wrapper>
              <UserName>
                Image
              </UserName>
            </Wrapper>
            <IdWrapper>
              <UserId>
                Feature
              </UserId>
            </IdWrapper>
          </UserItemHeader>
          {allUser?.map((item: IFetchUserData) => (
            <UserItem key={item?.id}>
              <IdWrapper>
                <UserId>{item?.id || 0}</UserId>
              </IdWrapper>
              <Wrapper>
                <UserName>
                  {item?.fullName || ''}
                </UserName>
              </Wrapper>
              <EmailWrapper>
                <UserId>
                  {item?.email || ''}
                </UserId>
              </EmailWrapper>
              <Wrapper>
                <UserId>
                  {item?.address || ''}
                </UserId>
              </Wrapper>
              <Wrapper>
                <UserId>
                  {item?.password || ''}

                </UserId>
              </Wrapper>
              <Wrapper>
                <UserId>
                  {item?.phoneNumber || ''}
                </UserId>
              </Wrapper>
              <IdWrapper>
                <UserId>
                  {item?.roleId || 2}
                </UserId>
              </IdWrapper>
              <Wrapper>
                <UserImage src={item?.image || ''} />
              </Wrapper>
              <FeatureWrapper>
                <EditOutlined /* onClick={() => handleEditUser(item?.id)} */ />
                <DeleteOutlined /* onClick={() => handleDeleteUser(item?.id)} */ />
              </FeatureWrapper>
            </UserItem>
          ))}
        </Container>
      </OptionContainer>
    </>
  );
};

export default AdminUser
