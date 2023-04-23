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
import { createCategory, deleteCategory, editCategory } from '@/apiServices/categoryServices';
import { AddIcon, CategoryId, CategoryImage, CategoryItem, CategoryItemHeader, CategoryName, Container, FileUpload, IdWrapper, ImageWrapper, NameWrapper, PreviewImage, PreviewImageWrapper } from '@/styled/AdminCategory.styled';
import { createUser } from '@/apiServices/userServices';
import { IUserCreateData } from '@/types/index.type';


const AdminUser: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userGetData, setUserGetData] = useState<any>({});

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
  const deleteUserMutation: any = useMutation({
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
  })
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
  const handleDeleteUser = (id: number) => {
    deleteUserMutation.mutate(id)
  }
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
            <input type="date" name="date" value={userGetData.date || ''} onChange={handleChange} />
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
          <CategoryItemHeader>
            <IdWrapper>
              <CategoryId>ID</CategoryId>
            </IdWrapper>
            <NameWrapper>
              <CategoryName>
                Name
              </CategoryName>
            </NameWrapper>
            <ImageWrapper>
              <CategoryName>
                Image
              </CategoryName>
            </ImageWrapper>
            <IdWrapper>
              <CategoryId>
                Feature
              </CategoryId>
            </IdWrapper>
          </CategoryItemHeader>
          {/* {categoryList?.map((item: IdataCategory) => (
            <CategoryItem key={item?.id}>
              <IdWrapper>
                <CategoryId>{item?.id}</CategoryId>
              </IdWrapper>
              <NameWrapper>
                <CategoryName>
                  {item.name}
                </CategoryName>
              </NameWrapper>
              <ImageWrapper>
                <CategoryImage src={item?.image} />
              </ImageWrapper>
              <FeatureWrapper>
                <EditOutlined onClick={() => handleEditUser(item?.id)} />
                <DeleteOutlined onClick={() => handleDeleteUser(item?.id)} />
              </FeatureWrapper>
            </CategoryItem>
          ))} */}
        </Container>
      </OptionContainer>
    </>
  );
};

export default AdminUser
