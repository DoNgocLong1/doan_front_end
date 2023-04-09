import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
} from 'antd';
import { message } from 'antd';

import { Container } from '@/styled/Admin.styled';
import { createProduct } from '@/apiServices/productService';
import { useMutation } from 'react-query';
import { createCategory } from '@/apiServices/categoryServices';
import { ICategory } from '@/types/index.type';

const { TextArea } = Input;

const FormDisabledDemo: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const createProductMutation = useMutation({
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'create product success',
      });
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'create product failed',
      });
    },
    mutationFn: (categoryData: ICategory) => createCategory(categoryData)
  })
  const onFinish = async (values: any) => {
    const {
      name,
      image
    } = values
    console.log(image.file.thumbUrl)
    const categoryData: ICategory = {
      name,
      image: image.file.thumbUrl,
    }
    //createProductMutation.mutate(categoryData)
    //await createProduct(productData)
  };
  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'error',
      content: 'create product failed',
    });
  };
  return (
    <>
      <Container>
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
      </Container>
    </>
  );
};

export default FormDisabledDemo
