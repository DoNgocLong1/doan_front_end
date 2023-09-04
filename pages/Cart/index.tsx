import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Radio, Select } from "antd";
import {
  Banner,
  BannerTitle,
  CartBannerWrapper,
  CartContainer,
  CartWrapper,
  Container,
  GotoProductPage,
  ItemName,
  ItemTh,
  ItemTr,
  ItemWrapper,
  NoteContent,
  NoteTitle,
  NoteWrapper,
  PaymentButton,
  ProductImg,
  ProductName,
  ProductNameAndImgWrapper,
  ProductQuantity,
  ProductQuantityButton,
  ProductQuantityButtonWrapper,
  ProductRemove,
  ProductTotal,
  ProductUnitPrice,
  SubTotal,
  SubTotalTitle,
  SubTotalWrapper,
  TitleName,
  TitleTh,
  TitleTr,
  TitleWrapper,
} from "../../styled/Cart.styled";
import { DeleteOutlined } from "@ant-design/icons";
import useCart from "@/hooks/useCart";
import { instance } from "@/apiServices/instance";
import Link from "next/link";
import EmptyItem from "@/components/common/EmptyCart/EmptyCart";
import SuccessPayment from "@/components/common/SuccessPayment/SuccessPayment";
import images from "@/images";
import { ICartList } from "@/types/cartType.type";
import { getCookie } from "@/helper";
import { getUser } from "@/apiServices/userServices";
import { postOrder } from "@/apiServices/orderService";
import { postOrderType } from "@/types/index.type";
import Head from "next/head";

export const getServerSideProps = async (props: any) => {
  const tokenType = props.req.headers.cookie || '';
  const token = getCookie('token', tokenType) || ''
  const fetchUserData = await getUser(token)
  const userData = fetchUserData?.data || {}
  return {
    props: { userData }
  }
}

const Cart = ({ userData }: any) => {
  const [appearSuccess, setAppearSuccess] = useState<boolean>(false);
  const {
    handleAddItem,
    handleDecreaseItem,
    handleRemove,
    cartList,
    orderList,
    totalPrice,
  } = useCart();
  const { Option } = Select;
  const onFinish = async (values: any) => {
    console.log("first", values);
    if (values.paymentMethod === '0') {

    }
    const token = getCookie('token') || '';
    const formData: postOrderType = {
      amount: totalPrice,
      orderList: JSON.stringify(orderList),
      fullName: values?.fullName,
      phoneNumber: +values?.phoneNumber,
      note: values?.note || '',
    };
    setAppearSuccess(true)
    await postOrder(formData, token)
  };
  if (!cartList.length)
    return (
      <>
        <Head>
          <meta data-n-head="ssr" data-hid="description" name="description" content="Product Cart" />
          <link
            data-n-head="ssr"
            data-hid="i18n-can"
            rel="canonical"
            href=''
          />
          <title>Product Cart</title>
        </Head>
        <Container>
          <EmptyItem
            des="Your Cart is empty"
          />
          <Link href="/product">
            <GotoProductPage>Continues Shopping</GotoProductPage>
          </Link>
        </Container>
      </>
    );
  return (
    <>
      <Head>
        <meta data-n-head="ssr" data-hid="description" name="description" content="Product Cart" />
        <link
          data-n-head="ssr"
          data-hid="i18n-can"
          rel="canonical"
          href=''
        />
        <title>Product Cart</title>
      </Head>
      <Container>
        <SuccessPayment isShow={appearSuccess} setIsShow={setAppearSuccess} />
        <CartBannerWrapper>
          <Banner src={images.cartBanner.src} />
          <BannerTitle>View cart</BannerTitle>
        </CartBannerWrapper>
        <CartContainer>
          <CartWrapper>
            <TitleWrapper>
              <TitleTr>
                <TitleName>Product</TitleName>
                <TitleTh>Unit Price</TitleTh>
                <TitleTh>Quantity</TitleTh>
                <TitleTh>Total</TitleTh>
                <TitleTh>Remove</TitleTh>
              </TitleTr>
            </TitleWrapper>
            <ItemWrapper>
              {cartList.map((item: ICartList, index: number) => (
                <ItemTr key={index}>
                  <ItemName>
                    <ProductNameAndImgWrapper>
                      <ProductImg src={item.img} />
                      <ProductName>{item.name}</ProductName>
                    </ProductNameAndImgWrapper>
                  </ItemName>
                  <ItemTh>
                    <ProductUnitPrice>{item.price} $</ProductUnitPrice>
                  </ItemTh>
                  <ItemTh>
                    <ProductQuantity>
                      {item.count}
                      <ProductQuantityButtonWrapper>
                        <ProductQuantityButton
                          onClick={() => handleAddItem(item)}
                        >
                          +
                        </ProductQuantityButton>
                        <ProductQuantityButton
                          onClick={() => handleDecreaseItem(item)}
                        >
                          -
                        </ProductQuantityButton>
                      </ProductQuantityButtonWrapper>
                    </ProductQuantity>
                  </ItemTh>
                  <ItemTh>
                    <ProductTotal>{item.total} $</ProductTotal>
                  </ItemTh>
                  <ItemTh>
                    <ProductRemove onClick={() => handleRemove(item)}>
                      <DeleteOutlined />
                    </ProductRemove>
                  </ItemTh>
                </ItemTr>
              ))}
            </ItemWrapper>
          </CartWrapper>
          <NoteWrapper>
            <Form
              initialValues={{
                fullName: userData.fullName,
                address: userData.address,
                phoneNumber: userData.phoneNumber
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="fullName"
                rules={[
                  { required: true, message: "Please input your name!" },
                  { max: 200, message: "Please input less than 200 characters" },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="address"
                rules={[
                  { required: true, message: "Please input your address!" },
                  { max: 200, message: "Please input less than 200 characters" },
                ]}
                hasFeedback
              >
                <Input placeholder="Address" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please input your phone number!" },
                  { max: 10, message: "Phone number must be 10 numbers" },
                  { min: 10, message: "Phone number must be 10 numbers" },
                  { pattern: new RegExp(/^[0-9]+$/), message: "Phone number must be number" },
                ]}
                hasFeedback
              >
                <Input placeholder="Phone number" />
              </Form.Item>
              <NoteWrapper>
                <NoteTitle>Order special instructions</NoteTitle>
                <Form.Item name="note">
                  <NoteContent placeholder="input your requirement" />
                </Form.Item>
                <SubTotalTitle>Subtotal:</SubTotalTitle>
                <SubTotal>{totalPrice} $</SubTotal>
              </NoteWrapper>
              {/* <Form.Item
                name="paymentMethod"
                rules={[{ required: true, message: 'Please pick an item!' }]}
              >
                <Radio.Group>
                  <Radio value="0">payment when receive</Radio>
                  <Radio value="1">payment now</Radio>
                </Radio.Group>
              </Form.Item> */}
              <Form.Item>
                <PaymentButton type="submit">Payment</PaymentButton>
              </Form.Item>
            </Form>
          </NoteWrapper>
        </CartContainer>
        <Link href="/product">
          <GotoProductPage>Continues Shopping</GotoProductPage>
        </Link>
      </Container>
    </>
  );
};

export default Cart;
