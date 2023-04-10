import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
} from 'antd';
import { message } from 'antd';

import { FeatureWrapper, OptionContainer } from '@/styled/Admin.styled';
import { createProduct } from '@/apiServices/productService';
import { useMutation } from 'react-query';
import { createCategory, deleteCategory } from '@/apiServices/categoryServices';
import { ICategory } from '@/types/index.type';
import { IdataCategory } from '@/types/productType.type';
import useCategory from '@/hooks/useCategory';
import { CategoryId, CategoryImage, CategoryItem, CategoryItemHeader, CategoryName, Container, IdWrapper, ImageWrapper, NameWrapper } from '@/styled/AdminCategory.styled';

const AdminCategory: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const createCategoryMutation: any = useMutation({
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
    mutationFn: (categoryData: ICategory) => createCategory(categoryData)
  })

  const deleteCategoryMutation: any = useMutation({
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
  const onFinish = async (values: any) => {
    const {
      name,
      image
    } = values
    const categoryData: ICategory = {
      name,
      image: image.file.thumbUrl,
    }
    createCategoryMutation.mutate(categoryData)
  };
  const handleDeleteCategory = (id: number) => {
    deleteCategoryMutation.mutate(id)
  }
  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'error',
      content: 'create product failed',
    });
  };
  const { categoryData } = useCategory();
  console.log(categoryData)
  return (
    <>
      <OptionContainer>
        {contextHolder}
        <Form
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Name" name="name">
            <Input placeholder='Product name' />
          </Form.Item>
          <Form.Item label="Upload" name="image">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Button" >
            <Button htmlType="submit">Add Category</Button>
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
          {categoryData?.map((item: IdataCategory) => (
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
                <EditOutlined />
                <DeleteOutlined onClick={() => handleDeleteCategory(item?.id)} />
              </FeatureWrapper>
            </CategoryItem>
          ))}
        </Container>
      </OptionContainer>
    </>
  );
};

export default AdminCategory
