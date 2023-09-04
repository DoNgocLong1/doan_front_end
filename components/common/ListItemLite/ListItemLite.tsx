import React, { useState } from "react";
import {
  Container,
  ItemDetailName,
  ItemDetailPrice,
  ItemDetailQuantity,
  ItemDetailWrapper,
  ItemFooter,
  ItemFooterButton,
  ItemFooterContent,
  ItemFooterTitle,
  ItemFooterWrapper,
  ItemImg,
  PropDownItemWrapper,
  PropDownListItemWrapper,
  PropDownTitle,
  QuantityButton,
  QuantityWrapper,
  RemoveButton,
} from "./ListItemLite.styled";
import { CloseOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import EmptyItem from "../EmptyCart/EmptyCart";
import Link from "next/link";
import useCart from "@/hooks/useCart";
import { useSelector } from "react-redux";
import { selectAuth } from "@/features/auth/authSlice";
import { useRouter } from "next/router";
import useShowDropDown from "@/hooks/useShowDropDown";
import Notification from "@/components/Notification";
import { message } from "antd";
const ListItemLite = () => {
  const router = useRouter()
  const {
    handleAddItem,
    handleDecreaseItem,
    handleRemove,
    cartList,
    orderList,
    totalPrice,
  } = useCart();
  console.log('cartList', cartList)
  const { isShowCart, handleShowCart } = useShowDropDown();
  const [messageApi, contextHolder] = message.useMessage();
  const { isAuthenticated } = useSelector(selectAuth);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const onOrder = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/cart')
    } else {
      messageApi.open({
        type: 'error',
        content: `You' re not login yet! please login to view cart`,
      });
    }
    handleShowCart()
  };
  return (
    <>
      {contextHolder}
      <Container>
        <PropDownTitle>Your cart</PropDownTitle>
        <PropDownListItemWrapper>
          {cartList.length === 0 ? (
            <EmptyItem
              des="Your Cart is empty"
            />
          ) : (
            cartList.map((item: any, index: number) => (
              <PropDownItemWrapper key={index}>
                <RemoveButton onClick={() => handleRemove(item)}>
                  <CloseOutlined />
                </RemoveButton>
                <ItemImg src={item?.img || ''} alt={item.name} title={item.name} width="175" height="175" />
                <ItemDetailWrapper>
                  <ItemDetailName>{item.name}</ItemDetailName>
                  <ItemDetailPrice>{item.price}$/1</ItemDetailPrice>
                  <QuantityWrapper>
                    <QuantityButton onClick={() => handleAddItem(item)}>
                      <PlusOutlined />
                    </QuantityButton>
                    <ItemDetailQuantity>{item.count} x</ItemDetailQuantity>
                    <QuantityButton onClick={() => handleDecreaseItem(item)}>
                      <MinusOutlined />
                    </QuantityButton>
                  </QuantityWrapper>
                  <ItemDetailPrice>{+item.price * Number(item.count)} $</ItemDetailPrice>
                </ItemDetailWrapper>
              </PropDownItemWrapper>
            ))
          )}
        </PropDownListItemWrapper>
        <ItemFooter>
          <ItemFooterWrapper>
            <ItemFooterTitle>Total: </ItemFooterTitle>
            <ItemFooterContent> {totalPrice}$</ItemFooterContent>
          </ItemFooterWrapper>
          <ItemFooterButton onClick={onOrder}>View cart</ItemFooterButton>
        </ItemFooter>
      </Container>
    </>
  );
};

export default ListItemLite;
