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

import { OptionContainer } from '@/styled/Admin.styled';
import { createProduct, fetchProduct } from '@/apiServices/productService';
import { useMutation } from 'react-query';
import { AddIcon, FileUpload, PreviewImage, PreviewImageWrapper, ProductFeatureWrapper, Wrapper, NameWrapper } from '@/styled/AdminProduct.styled';
import { IProductAddItem, IProductItem } from '@/types/productType.type';
import { getCookie } from '@/helper';
import { getUser } from '@/apiServices/userServices';
import { Container, EmailWrapper, IdWrapper, UserId, UserItem, UserItemHeader, UserName } from '@/styled/AdminUser.styled';
import { useRouter } from 'next/router';
import PaginationBar from '@/components/common/Navigation/Pagination';
import { FeatureWrapper } from '@/styled/Account.styled';
import { getProductDetail } from '@/apiServices/productService';
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
  const [productData, setProductData] = useState<IProductItem>({
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
  const [productGetData, setProductGetData] = useState<IProductItem[]>([])
  const [count, setCount] = useState<number>(0)
  const { query } = useRouter();
  const fetchProductData = async () => {
    const data: any = await fetchProduct(query || {})
    setProductGetData(data?.data?.data?.data || [])
    setCount(+data?.data?.data.count)
  }
  useEffect(() => {
    fetchProductData()
  }, [query])
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
    const productFormData: IProductAddItem = {
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
    createProductMutation.mutate(productFormData)
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
        setProductData((userGetData: any) => ({ ...(userGetData), [e.target.name]: reader.result as string }));
      }
      reader.readAsDataURL(file)
    } else {
      setProductData((userGetData: any) => ({ ...userGetData, [e.target.name]: e.target.value }));
    }
  };
  const handleDeleteProduct = (id: number) => { }
  const handleSelectProduct = async (id: number) => {
    const product = await getProductDetail(id.toString())
    const productFetchData = product?.data?.product || {}
    console.log(product?.data?.product)
    const formData = {
      id: productFetchData.id,
      categoryId: productFetchData.categoryId,
      name: productFetchData.name,
      brand: productFetchData.brand,
      rate: productFetchData.rate,
      price: productFetchData.price,
      description: productFetchData.description,
      parameter: productFetchData.parameter,
      quantityInStock: productFetchData.quantityInStock,
      discount: productFetchData.discount,
      sold: productFetchData.sold,
    }
  }
  const handleUpdateProduct = () => { }
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
              value={productData.name || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Category"
            rules={[
              { required: true, message: "Please select category!" }]}
          >
            <Select
              value={productData.categoryId || ''}
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
              value={productData.brand || ''}
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
              value={productData.price || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input placeholder='Product preview'
              name="description"
              value={productData.description || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Product detail">
            <TextArea rows={4}
              name="parameter"
              value={productData.parameter || ''}
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
              value={productData.quantityInStock || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Rate">
            <Input placeholder='Rate'
              name="rate"
              value={productData.rate || ''}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Discount">
            <Input placeholder='Discount'
              name="discount"
              value={productData.discount || ''}
              onChange={handleChange}
            />
          </Form.Item>
          {/* <Form.Item label="Upload">
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
          </Form.Item> */}
          <Form.Item label="Button" >
            <Button htmlType="submit">Add product</Button>
          </Form.Item>
        </Form>
        <Container>
          <UserItemHeader>
            <IdWrapper>
              <UserId>ID</UserId>
            </IdWrapper>
            <NameWrapper>
              <UserId>
                Name
              </UserId>
            </NameWrapper>
            <Wrapper>
              <UserId>
                Category
              </UserId>
            </Wrapper>
            <Wrapper>
              <UserId>
                Brand
              </UserId>
            </Wrapper>
            <Wrapper>
              <UserId>
                Price
              </UserId>
            </Wrapper>
            <Wrapper>
              <UserId>
                Description
              </UserId>
            </Wrapper>
            <Wrapper>
              <UserId>
                Quantity
              </UserId>
            </Wrapper>
            <Wrapper>
              <UserId>
                Rate
              </UserId>
            </Wrapper>
            <Wrapper>
              <UserId>
                Discount
              </UserId>
            </Wrapper>
            <Wrapper>
              <UserId>
                Feature
              </UserId>
            </Wrapper>
          </UserItemHeader>
          {productGetData?.map((item: any) => (
            <UserItem key={item?.id}>
              <IdWrapper>
                <UserId>{item?.id || 0}</UserId>
              </IdWrapper>
              <NameWrapper>
                <UserId>
                  {item?.name || ''}
                </UserId>
              </NameWrapper>
              <Wrapper>
                <UserId>
                  {item?.categoryId || 0}
                </UserId>
              </Wrapper>
              <Wrapper>
                <UserId>
                  {item?.brand || ''}
                </UserId>
              </Wrapper>
              <Wrapper>
                <UserId>
                  {item?.price || 0}
                </UserId>
              </Wrapper>
              <Wrapper>
                <UserId>
                  {item?.description || ''}
                </UserId>
              </Wrapper>
              <Wrapper>
                <UserId>
                  {item?.quantityInStock || 0}
                </UserId>
              </Wrapper>
              <Wrapper>
                <UserId>
                  {item?.rate || 0}
                </UserId>
              </Wrapper>
              <Wrapper>
                <UserId>
                  {item?.discount || 0}
                </UserId>
              </Wrapper>
              <Wrapper>
                <ProductFeatureWrapper>
                  <EditOutlined onClick={() => handleSelectProduct(item?.id || 0)} />
                  <DeleteOutlined onClick={() => handleDeleteProduct(item?.id || 0)} />
                </ProductFeatureWrapper>
              </Wrapper>
            </UserItem>
          ))}
        </Container>
        <PaginationBar
          totalItem={count}
        />
      </OptionContainer>
    </>
  );
};

export default FormDisabledDemo
