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

import { OptionContainer } from '@/styled/Admin.styled';
import { createProduct } from '@/apiServices/productService';
import { useMutation } from 'react-query';

const { TextArea } = Input;

const FormDisabledDemo: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
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
    mutationFn: (productData: any) => createProduct(productData)
  })
  const onFinish = async (values: any) => {
    console.log(values)
    const {
      name,
      categoryId,
      brand,
      price,
      description,
      parameter,
      quantityInStock,
      rate,
      discount
    } = values
    const productData: any = {
      name,
      categoryId: Number(categoryId),
      brand,
      price,
      description,
      parameter,
      quantityInStock,
      rate: Number(rate),
      discount: Number(discount)
    };
    console.log(productData)
    createProductMutation.mutate(productData)
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
          <Form.Item
            label="Select"
            name="categoryId"
            rules={[
              { required: true, message: "Please select category!" }]}
          >
            <Select>
              <Select.Option value="1">Laptops</Select.Option>
              <Select.Option value="2">Desktops</Select.Option>
              <Select.Option value="3">Monitors</Select.Option>
              <Select.Option value="4">Projectors</Select.Option>
              <Select.Option value="5">Graphic cards</Select.Option>
              <Select.Option value="6">Accessories</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Brand" name="brand">
            <Input placeholder='Brand name' />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input your phone number!" },
              { pattern: new RegExp(/^[0-9]+$/), message: "price must be number" },
            ]}
          >
            <Input placeholder='Price' />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input placeholder='Product preview' />
          </Form.Item>
          <Form.Item label="Product detail" name="parameter">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Quantity in stock"
            name="quantityInStock"
            rules={[
              { required: true, message: "Please input quantity in stock" },
              { pattern: new RegExp(/^[0-9]+$/), message: "Quantity must be number" },
            ]}
          >
            <Input placeholder='Quantity in stock' />
          </Form.Item>
          <Form.Item label="Rate" name="rate">
            <Input placeholder='Rate' />
          </Form.Item>
          <Form.Item label="Discount" name="discount">
            <Input placeholder='Discount' />
          </Form.Item>
          <Form.Item label="Upload" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Button" >
            <Button htmlType="submit">Add product</Button>
          </Form.Item>
        </Form>
      </OptionContainer>
    </>
  );
};

export default FormDisabledDemo
