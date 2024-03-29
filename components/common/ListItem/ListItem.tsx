//import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { addItem } from "@/features/cart/cartSlice";
import { CartItemType } from "@/types/cartType.type";
import { IProductItem, IProductItemData } from "@/types/productType.type";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Rate, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import EmptyItem from "../EmptyCart/EmptyCart";
import Notification from "../Notification/Notification";
import {
  AddButton,
  Container,
  Count,
  Discount,
  ItemBottom,
  ItemImage,
  ItemImageWrapper,
  ItemName,
  ItemPrice,
  ItemType,
  ItemWrapper,
  ListItemWrapper,
  ProductAction,
  ProductActionWrapper,
  /* ProductAction,
  ProductActionWrapper, */
  RateNumber,
  RateWrapper,
} from "./ListItem.styled";
export interface IListItem {
  data?: IProductItem[];
  ItemPerRow?: number | string;
  ItemPerRowOnMobile?: number | string;
  ItemPerRowOnTablet?: number | string;
  size?: string;
}
const ListItem = ({
  data = [],
  ItemPerRow = "auto-fit",
  ItemPerRowOnMobile = "auto-fit",
  ItemPerRowOnTablet = "auto-fit",
  size = "minmax(25em, 1fr)",
}: IListItem) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const handleAddItem = (payload: any): void => {
    const payloadData: CartItemType = {
      id: payload.id,
      img: payload.Image_Products.image || '',
      name: payload.name,
      price: +payload.price,
    };
    dispatch(addItem(payloadData));
  };
  const handleSelectProduct = (id: string): void => {
    router.push(`/product-detail/${id}`)
  }
  return (
    <Container>
      {contextHolder}
      {data.length === 0 &&
        <EmptyItem des="can not find" />
      }
      <ListItemWrapper
        ItemPerRow={ItemPerRow}
        ItemPerRowOnMobile={ItemPerRowOnMobile}
        ItemPerRowOnTablet={ItemPerRowOnTablet}
        size={size}
      >
        {data?.map((item: IProductItemData, index) => (
          <ItemWrapper key={index}>
            {item.discount > 0 && <Discount>-{item.discount}%</Discount>}
            {item.count && <Count>x{item.count}</Count>}
            <ItemImageWrapper>
              <Link href={`/product-detail/${item.id}`}>
                <ItemImage
                  src={item?.Image_Products?.image}
                  alt={item.name}
                  title={item.name}
                  width="200"
                  height="200"
                />
              </Link>
              {/* <ProductActionWrapper>
                <ProductAction>
                  <HeartOutlined style={{ fontSize: "3em", color: "orange" }} />
                </ProductAction>
                <ProductAction></ProductAction>
                <ProductAction></ProductAction>
              </ProductActionWrapper> */}
            </ItemImageWrapper>
            <Link href={`/product-detail/${item.id}`}>
              <ItemName
              >
                {item.name}
              </ItemName>
            </Link>
            <RateWrapper>
              <Rate disabled allowHalf defaultValue={+item.rate} />
              <RateNumber>({item.rate})</RateNumber>
            </RateWrapper>
            <ItemBottom>
              <ItemPrice>{item?.price || 1000} $</ItemPrice>
              <Notification
                button={
                  <AddButton onClick={() => handleAddItem(item)}>
                    <ShoppingCartOutlined /> Add
                  </AddButton>
                }
                messageType={"successful"}
                messageContent={"add to cart succeed"}
              />
            </ItemBottom>
          </ItemWrapper>
        ))}
      </ListItemWrapper>
    </Container>
  );
};

export default ListItem;
