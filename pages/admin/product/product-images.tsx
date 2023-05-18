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
import { createProduct, createProductImages, updateProductImages } from '@/apiServices/productService';
import { useMutation } from 'react-query';
import { AddIcon, FileUpload, PreviewImage, PreviewImageWrapper } from '@/styled/AdminProduct.styled';
import { IProductAddItem, IProductImage, IProductItem } from '@/types/productType.type';
const { TextArea } = Input;

const FormDisabledDemo: React.FC = () => {
  const [previewImg, setPreviewImg] = useState<string>('');
  const [getProductData, setGetProductData] = useState<IProductImage>({
    id: 0,
    productId: 0,
    image: '',
  });
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'This is a success message',
    });
  };
  const createProductImageMutation = useMutation({
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
    mutationFn: (productData: IProductImage) => createProductImages(productData)
  })
  const onFinish = async (values: any) => {
    const productData: IProductImage = {
      productId: getProductData.productId,
      image: getProductData.image,
    };
    console.log(productData)
    createProductImageMutation.mutate(productData)
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
  console.log(getProductData)
  const handleUpdateImage = async () => {
    console.log(getProductData)
    await updateProductImages(getProductData)
  }
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
              name="productId"
              value={getProductData.productId || ''}
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
                {getProductData.image ?
                  <PreviewImage
                    src={getProductData?.image || ''}
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
            <Button onClick={handleUpdateImage}>Update product</Button>
          </Form.Item>
        </Form>
      </OptionContainer>
    </>
  );
};

export default FormDisabledDemo
