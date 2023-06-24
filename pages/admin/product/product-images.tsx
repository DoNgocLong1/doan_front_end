import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
} from 'antd';
import { message } from 'antd';

import { ActionWrapper, DataContainer, DataHeader, DataSection, ImageItem, OptionContainer, RenderDataSection, Text, Wrapper } from '@/styled/Admin.styled';
import { createProduct, createProductImages, getProductImages, updateProductImages } from '@/apiServices/productService';
import { useMutation } from 'react-query';
import { AddIcon, FileUpload, PreviewImage, PreviewImageWrapper } from '@/styled/AdminProduct.styled';
import { IProductAddItem, IProductImage, IProductItem } from '@/types/productType.type';
import { getCookie } from '@/helper';
import { getUser } from '@/apiServices/userServices';
import PaginationBar from '@/components/common/Navigation/Pagination';
import { useRouter } from 'next/router';
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
  const [getProductData, setGetProductData] = useState<IProductImage>({
    id: 0,
    productId: 0,
    image: '',
  });
  const [imageData, setImageData] = useState<IProductImage[]>([])
  const router = useRouter();

  const fetchImage = async () => {
    const res = await getProductImages(+(router?.query?.page || 1));
    setImageData(res?.data || [])
  }
  useEffect(() => {
    fetchImage()
  }, [router?.query?.page])
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
  const handleSelectImage = (id: string | number | null) => {

  }
  const handleSetDeleteImage = (id: string | number | null) => {

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
        <DataContainer>
          <DataHeader>
            <Wrapper>
              <Text>
                ID
              </Text>
            </Wrapper>
            <Wrapper>
              <Text>
                Product ID
              </Text>
            </Wrapper>
            <Wrapper>
              <Text>
                Image
              </Text>
            </Wrapper>
            <Wrapper>
              <Text>
                Action
              </Text>
            </Wrapper>
          </DataHeader>
          <RenderDataSection>
            {imageData.map((item) => (
              <DataSection key={item.id}>
                <Wrapper>
                  <Text>
                    {item.id}
                  </Text>
                </Wrapper>
                <Wrapper>
                  <Text>
                    {item.productId}
                  </Text>
                </Wrapper>
                <Wrapper>
                  <ImageItem
                    width="100"
                    height="100"
                    src={item?.image || ''}
                  />
                </Wrapper>
                <ActionWrapper>
                  <EditOutlined onClick={() => handleSelectImage(item?.id || null)} />
                  <DeleteOutlined onClick={() => handleSetDeleteImage(item?.id || null)} />
                </ActionWrapper>
              </DataSection>
            ))}
          </RenderDataSection>
        </DataContainer>
        <PaginationBar
          totalItem={97}
        />
      </OptionContainer >
    </>
  );
};

export default FormDisabledDemo
