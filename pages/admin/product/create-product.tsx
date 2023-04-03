import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
} from 'antd';
import { Container } from '@/styled/Admin.styled';
import { createProduct } from '@/apiServices/productService';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const FormDisabledDemo: React.FC = () => {
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
    //await createProduct(productData)
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Container>
        <Form
            layout="horizontal"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Name" name="name">
            <Input placeholder='Product name'/>
          </Form.Item>
          <Form.Item label="Select" name="categoryId">
            <Select defaultValue="1">
                <Select.Option value="1">Laptops</Select.Option>
                <Select.Option value="2">Desktops</Select.Option>
                <Select.Option value="3">Monitors</Select.Option>
                <Select.Option value="4">Projectors</Select.Option>
                <Select.Option value="5">Graphic cards</Select.Option>
                <Select.Option value="6">Accessories</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Name" name="brand">
            <Input placeholder='Brand name'/>
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input placeholder='Price'/>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input placeholder='Product preview'/>
          </Form.Item>
          <Form.Item label="Product detail" name="parameter">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Quantity in stock" name="quantityInStock">
            <Input placeholder='Quantity in stock'/>
          </Form.Item>
          <Form.Item label="Rate" name="rate">
            <Input placeholder='Rate'/>
          </Form.Item>
          <Form.Item label="Discount" name="discount">
            <Input placeholder='Discount'/>
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
      </Container>
    </>
  );
};

export default FormDisabledDemo