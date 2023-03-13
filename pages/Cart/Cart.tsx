import images from "assets/images";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "./Cart.styled";
import { DeleteOutlined } from "@ant-design/icons";
import EmptyCart from "components/common/EmptyCart/EmptyCart";
import useCart from "hooks/useCart";
import { ICartList } from "types/cartType.type";
import { instance } from "apiServices/instance";
import SuccessPayment from "components/common/SuccessPayment/SuccessPayment";
const Cart = () => {
  const user = localStorage.getItem("user");
  const userData = JSON.parse(user || "");
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
        <EmptyCart />
        <Link to="/product">
          <GotoProductPage>Continues Shopping</GotoProductPage>
        </Link>
      </Container>
    );
  return (
    <Container>
      <SuccessPayment isShow={appearSuccess} setIsShow={setAppearSuccess} />
      <CartBannerWrapper>
        <Banner src={images.cartBanner} />
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
                { max: 10, message: "Phone number is less than 10 numbers" },
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
              <PaymentButton htmlType="submit">Payment</PaymentButton>
            </Form.Item>
          </Form>
        </NoteWrapper>
      </CartContainer>
      <Link to="/product">
        <GotoProductPage>Continues Shopping</GotoProductPage>
      </Link>
    </Container>
  );
};

export default Cart;
