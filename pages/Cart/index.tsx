import React, { useState } from "react";
import { Form, Input } from "antd";
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
const Cart = () => {
  let user: any;
  let userData: any;
  if (typeof window !== 'undefined') {
    user = localStorage.getItem("user");
    userData = JSON.parse(user || "");
  }
  const [appearSuccess, setAppearSuccess] = useState<boolean>(false);
  const {
    handleAddItem,
    handleDecreaseItem,
    handleRemove,
    cartList,
    orderList,
    totalPrice,
  } = useCart();
  const onFinish = async (values: any) => {
    console.log("first", values);
    const params: any = {
      user_id: 1,
      amount: totalPrice,
      obj: orderList,
    };
    const config = {
      headers: {
        "Content-Type": `application/json`,
      },
    };
    await instance
      .post("order", JSON.stringify(params), config)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setAppearSuccess(true);
  };
  if (!cartList.length)
    return (
      <Container>
        <EmptyItem
          des="Your Cart is empty"
        />
        <Link href="/product">
          <GotoProductPage>Continues Shopping</GotoProductPage>
        </Link>
      </Container>
    );
  return (
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
          <Form layout="horizontal" size="large" onFinish={onFinish}>
            <Form.Item
              name="user_name"
              initialValue={userData.name}
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
            <SubTotalWrapper></SubTotalWrapper>
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
  );
};

export default Cart;
