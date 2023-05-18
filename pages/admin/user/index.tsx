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
import { updateUserById, createUser, getAllUser, getUserById, deleteUserById } from '@/apiServices/userServices';
import { IFetchUserData, IUserCreateData, IUserData } from '@/types/index.type';
import { DateInput } from '@/styled/Account.styled';
import { IUser } from '@/types/userType.type';

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
const AdminUser = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userGetData, setUserGetData] = useState<IUser>({
    fullName: '',
    email: '',
    password: '',
  });
  const [allUsers, setAllUsers] = useState<any>([])
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const fetchAllUser = async () => {
    const allUser = await getAllUser()
    setAllUsers(allUser?.data)
    console.log('find')
  }
  useEffect(() => {
    fetchAllUser()
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
  const UpdateUserMutation: any = useMutation({
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Update category success',
      });
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Update category failed',
      });
    },
    mutationFn: (userData: IUser) => updateUserById(userData)
  })
  const deleteUserMutation: any = useMutation({
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'delete user success',
      });
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'delete user failed',
      });
    },
    mutationFn: (id: number) => deleteUserById(id)
  })
  const onFinish = async () => {
    const userFormData: IUser = {
      fullName: userGetData.fullName,
      email: userGetData.email,
      password: userGetData.password,
      address: userGetData.address,
      phoneNumber: userGetData.phoneNumber,
      roleId: userGetData?.roleId || 2,
      image: userGetData.image,
    }
    createUserMutation.mutate(userFormData)
    setTimeout(() => {
      fetchAllUser()
    },1000)
  };
  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id)
    setTimeout(() => {
      fetchAllUser()
    },1000)
  }
  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'error',
      content: 'create product failed',
    });
  };


  const handleSelectUser = async (id: number) => {
    setIsEdit(true)
    const fetchCategoryData: any = await getUserById(id)
    const {
      fullName,
      email,
      password,
      address,
      phoneNumber,
      roleId,
      image
    } = fetchCategoryData?.data || {}
    setUserGetData({
      id,
      fullName,
      email,
      password,
      address,
      phoneNumber,
      roleId,
      image
    })
  }
  const handleUpdateUser = async() => {
    UpdateUserMutation.mutate(userGetData);
    setTimeout(() => {
      fetchAllUser()
    },1000)
    setUserGetData({
      fullName: '',
      email: '',
      password: '',
    })
    setIsEdit(false)
  }
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
          {/* <Form.Item label="Date of birth">
            <DateInput type="date" name="date" value={userGetData.date || ''} onChange={handleChange} />
          </Form.Item> */}
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
            {isEdit ?
            <Button onClick={handleUpdateUser}>Update user</Button>
            :
            <Button htmlType="submit">Add user</Button>
            }
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
          {allUsers?.map((item: IFetchUserData) => (
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
                <EditOutlined onClick={() => handleSelectUser(item?.id)} />
                <DeleteOutlined onClick={() => handleDeleteUser(item?.id)} />
              </FeatureWrapper>
            </UserItem>
          ))}
        </Container>
      </OptionContainer>
    </>
  );
};

export default AdminUser
