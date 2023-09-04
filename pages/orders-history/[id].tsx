import React, { useEffect } from "react";
import type { GetServerSideProps } from 'next';
import { getCookie } from "@/helper";
import { getOrders, getProductsOrder } from "@/apiServices/orderService";
import { Container, OrderHistoryContainer, GotoProductPage, HeadingText, OrderHistoryRow, DetailOrderWrapper } from "@/styled/OderHistory.styled";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { AddAllItem } from "@/features/cart/cartSlice";
import { Form, Input, message } from "antd";
import { useMutation } from "react-query";
import EmptyItem from "@/components/common/EmptyCart/EmptyCart";
import Link from "next/link";
import ListItem from "@/components/common/ListItem/ListItem";
import { NoteContent, NoteTitle, NoteWrapper, SubTotal, SubTotalTitle } from "@/styled/Cart.styled";
import { getUser } from "@/apiServices/userServices";
export const getServerSideProps: GetServerSideProps = async (contexts) => {
  const id: any = contexts.query.id;
  const fetchOrder = await getProductsOrder(id)
  const data = fetchOrder?.data?.data.orderList || [];
  const OrderInfo = fetchOrder?.data?.data.orderInfo || {};
  const tokenType = contexts.req.headers.cookie || '';
  const token = getCookie('token', tokenType) || ''
  const fetchUserData = await getUser(token)
  const userData = fetchUserData?.data || {}
  const productsArray = data.reduce((array: any, item: any) => {
    return array = [...array, {
      Image_Products: {
        image: item.Image_Products[0].image
      },
      count: item?.quantity || 1,
      ...item.orderData
    }]
  }, [])
  return {
    props: {
      productData: productsArray,
      OrderInfo,
      userData
    }
  }
}
interface IOrderHistory {
  productData: any,
  OrderInfo: any,
  userData: any,
}
const OrderHistory = ({ productData, OrderInfo, userData }: IOrderHistory) => {
  const dispatch = useDispatch()
  /* const token = getCookie('token') || '';
  const test = async () => {
    const fetchOrder = await getProductsOrder(1);
    console.log(fetchOrder)
  }
  useEffect(() => {
    test()
  }, []) */
  console.log(OrderInfo)
  const [messageApi, contextHolder] = message.useMessage();
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
  if (!productData.length)
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
        <HeadingText>Your Order Detail</HeadingText>
        <OrderHistoryRow>
          <NoteWrapper>
            <Form
              initialValues={{
                fullName: OrderInfo?.fullName || '',
                address: userData?.address || '',
                phoneNumber: OrderInfo?.phoneNumber || null,
                note: OrderInfo?.note || ''
              }}
            >
              <Form.Item name="fullName">
                <Input
                  placeholder="Name"
                  disabled
                />
              </Form.Item>
              <Form.Item name="address">
                <Input placeholder="Address" disabled />
              </Form.Item>
              <Form.Item name="phoneNumber">
                <Input placeholder="Phone number" disabled />
              </Form.Item>
              <NoteWrapper>
                <NoteTitle>Order special instructions</NoteTitle>
                <Form.Item name="note">
                  <NoteContent placeholder="input your requirement" disabled />
                </Form.Item>
                <SubTotalTitle>Subtotal:</SubTotalTitle>
                <SubTotal>{OrderInfo.amount} $</SubTotal>
              </NoteWrapper>
              <Form.Item
                name="paymentMethod"
                rules={[{ required: true, message: 'Please pick an item!' }]}
              >
              </Form.Item>
            </Form>
          </NoteWrapper>
          <DetailOrderWrapper>
            <ListItem
              data={productData}
            />
          </DetailOrderWrapper>
        </OrderHistoryRow>
      </Container>
    </>
  );
};

export default OrderHistory;
