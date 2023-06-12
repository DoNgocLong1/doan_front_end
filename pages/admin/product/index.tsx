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
import { AddIcon, FileUpload, PreviewImage, PreviewImageWrapper } from '@/styled/AdminProduct.styled';
import { IProductAddItem, IProductItem } from '@/types/productType.type';
import { getCookie } from '@/helper';
import { getUser } from '@/apiServices/userServices';
const { TextArea } = Input;
export const getServerSideProps = async (contexts: any) => {
  const tokenType = contexts.req.headers.cookie
  const token = getCookie('token', tokenType)
  const fetchUser = await getUser(token);
  const role = fetchUser?.data?.roleId || 2;
  if (role === 2) {
    return {
      notFound: true
    }
  }
  return {
    props: {
    }
  }
}
const FormDisabledDemo: React.FC = () => {
  const [previewImg, setPreviewImg] = useState<string>('');
  const [getProductData, setGetProductData] = useState<IProductItem>({
    id: '',
    categoryId: 0,
    name: '',
    brand: '',
    rate: 0,
    price: 0,
    description: '',
    parameter: '',
    quantityInStock: 0,
    discount: 0,
    sold: 0,
  });
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
    const {
      name,
      categoryId,
      brand,
      price,
      description,
      parameter,
      quantityInStock,
      rate,
      discount,
      sold
    } = values
    const productData: IProductAddItem = {
      name,
      categoryId: Number(categoryId),
      brand,
      price,
      description,
      parameter,
      quantityInStock,
      rate: Number(rate),
      discount: Number(discount),
      sold
    };
    createProductMutation.mutate(productData)
    //await createProduct(productData)
  };
  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'error',
      content: 'create product failed',
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    if (e?.target?.files?.[0]) {
      const file = e?.target?.files?.[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setGetProductData((userGetData: any) => ({ ...(userGetData), [e.target.name]: reader.result as string }));
      }
      reader.readAsDataURL(file)
    } else {
      setGetProductData((userGetData: any) => ({ ...userGetData, [e.target.name]: e.target.value }));
    }
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
          <Form.Item label="Name">
            <Input
              placeholder='Product name'
              name="name"
              value={getProductData.name || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Select"
            rules={[
              { required: true, message: "Please select category!" }]}
          >
            <Select
              value={getProductData.categoryId || ''}
              onChange={handleChange}
            >
              <Select.Option value="1">Laptops</Select.Option>
              <Select.Option value="2">Desktops</Select.Option>
              <Select.Option value="3">Monitors</Select.Option>
              <Select.Option value="4">Projectors</Select.Option>
              <Select.Option value="5">Graphic cards</Select.Option>
              <Select.Option value="6">Accessories</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Brand">
            <Input
              placeholder='Brand name'
              name="brand"
              value={getProductData.brand || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Price"
            rules={[
              { required: true, message: "Please input your phone number!" },
              { pattern: new RegExp(/^[0-9]+$/), message: "price must be number" },
            ]}
          >
            <Input
              placeholder='Price'
              name="price"
              value={getProductData.price || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input placeholder='Product preview'
              name="description"
              value={getProductData.description || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Product detail">
            <TextArea rows={4}
              name="parameter"
              value={getProductData.parameter || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Quantity in stock"
            rules={[
              { required: true, message: "Please input quantity in stock" },
              { pattern: new RegExp(/^[0-9]+$/), message: "Quantity must be number" },
            ]}
          >
            <Input placeholder='Quantity in stock'
              name="quantityInStock"
              value={getProductData.quantityInStock || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Rate">
            <Input placeholder='Rate'
              name="rate"
              value={getProductData.rate || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Discount">
            <Input placeholder='Discount'
              name="discount"
              value={getProductData.discount || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Upload">
            <FileUpload
              type="file"
              id="file"
              name="image"
              onChange={handleChange}

            />
            <PreviewImageWrapper>
              <AddIcon htmlFor="file">
                {previewImg ?
                  <PreviewImage
                    src={previewImg}
                    alt="preview"
                    title="preview"
                    width="100"
                    height="100"
                  /> : "+"}

              </AddIcon>
            </PreviewImageWrapper>
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
