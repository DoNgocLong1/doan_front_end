import React, { useEffect } from "react";
import type { GetServerSideProps } from 'next';
import { getCookie } from "@/helper";
import { getOrders, getProductsOrder } from "@/apiServices/orderService";
import { Container, InfoWrapper, OrderHistoryContainer, OrderHistoryWrapper, ItemWrapper, ActionButton, GotoProductPage, HeadingText } from "@/styled/OderHistory.styled";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { AddAllItem } from "@/features/cart/cartSlice";
import { message } from "antd";
import { useMutation } from "react-query";
import EmptyItem from "@/components/common/EmptyCart/EmptyCart";
import Link from "next/link";
export const getServerSideProps: GetServerSideProps = async (contexts) => {
  const cookie = contexts.req.headers.cookie;
  const token: string = getCookie('token', cookie) || '';
  const fetchOrder = await getOrders(token);
  const data = fetchOrder?.data?.data || []
  return {
    props: {
      data: data,
    }
  }
}
interface IOrderHistory {
  data: any,
}
const OrderHistory = ({ data }: IOrderHistory) => {
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage();
  const token = getCookie('token') || '';
  /* const test = async () => {
    const fetchOrder = await getOrders(token);
    console.log(fetchOrder)
  }
  useEffect(() => {
    test()
  }, []) */
  const purchaseAgainMutation: any = useMutation({
    onSuccess: () => {
      messageApi.open({
        type: 'success',
        content: 'Add products to cart success',
      });
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: 'Add products to cart failed',
      });
    },
    mutationFn: (callback: any) => dispatch(callback)
  })

  const handleGetOrderDetail = async (id: number) => {
    const item: any = await getProductsOrder(id)
    const products = item?.data?.data || []
    const productsArray = products.reduce((array: any, item: any) => {
      return array = [...array, {
        img: item.Image_Products[0].image,
        count: item?.quantity || 1,
        ...item.orderData
      }]
    }, [])
    purchaseAgainMutation.mutate(AddAllItem(productsArray))
  }
  if (!data.length)
    return (
      <>
        <Head>
          <meta data-n-head="ssr" data-hid="description" name="description" content="Order History page" />
          <link
            data-n-head="ssr"
            data-hid="i18n-can"
            rel="canonical"
            href=''
          />
          <title>Order History</title>
        </Head>
        <Container>
          <EmptyItem
            des="Your Order History is empty"
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
        <meta data-n-head="ssr" data-hid="description" name="description" content="Order History page" />
        <link
          data-n-head="ssr"
          data-hid="i18n-can"
          rel="canonical"
          href=''
        />
        <title>Order History</title>
      </Head>
      <Container>
        {contextHolder}
        <HeadingText>Your Order History</HeadingText>
        <OrderHistoryContainer>
          {data?.map((item: any, index: number) => (
            <OrderHistoryWrapper key={index}>
              <ItemWrapper>
                <InfoWrapper>
                  Order Id
                </InfoWrapper>
                <InfoWrapper>
                  Full Name
                </InfoWrapper>
                <InfoWrapper>
                  Amount
                </InfoWrapper>
                <InfoWrapper>
                  Purchase day
                </InfoWrapper>
                <InfoWrapper>
                  Action
                </InfoWrapper>
              </ItemWrapper>
              <ItemWrapper>
                <InfoWrapper>
                  {item.id}
                </InfoWrapper>
                <InfoWrapper>
                  {item.fullName}
                </InfoWrapper>
                <InfoWrapper>
                  {item.amount}
                </InfoWrapper>
                <InfoWrapper>
                  {item.updatedAt}
                </InfoWrapper>
                <InfoWrapper>
                  <ActionButton onClick={() => handleGetOrderDetail(item.id)}>Purchase again</ActionButton>
                  <Link href={`orders-history/${item.id}`}>
                    <ActionButton>Detail</ActionButton>
                  </Link>
                </InfoWrapper>
              </ItemWrapper>
            </OrderHistoryWrapper>
          ))}
        </OrderHistoryContainer>
      </Container>
    </>
  );
};

export default OrderHistory;
