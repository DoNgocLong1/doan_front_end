//import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { addItem } from "@/features/cart/cartSlice";
import { CartItemType } from "@/types/cartType.type";
import { IProductItem } from "@/types/productType.type";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import Notification from "../Notification/Notification";
import {
  AddButton,
  Container,
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
  const handleAddItem = (payload: any): void => {
    const payloadData: CartItemType = {
      id: payload.id,
      img: payload.image,
      name: payload.name,
      price: +payload.price,
    };
    dispatch(addItem(payloadData));
  };
  const handleSelectProduct = (id: number): void => {
    router.push(`/product-detail/${id}`)
  }
  return (
    <Container>
      <ListItemWrapper
        ItemPerRow={ItemPerRow}
        ItemPerRowOnMobile={ItemPerRowOnMobile}
        ItemPerRowOnTablet={ItemPerRowOnTablet}
        size={size}
      >
        {data?.map((item: any, index) => (
          <ItemWrapper key={index}>
            {item.discount > 0 && <Discount>-{item.discount}%</Discount>}
            <ItemImageWrapper>
              <ItemImage
                src={ `data:image/webp;base64,${item.Image_Products[0]?.image.data}`}
                alt={item.name}
              />
              <ProductActionWrapper>
                <ProductAction>
                  <HeartOutlined style={{ fontSize: "3em", color: "orange" }} />
                </ProductAction>
                <ProductAction></ProductAction>
                <ProductAction></ProductAction>
              </ProductActionWrapper>
            </ItemImageWrapper>
            <ItemType>{item.type}</ItemType>
            <ItemName
              onClick={() => handleSelectProduct(item.id)}
            >
              {item.name}
            </ItemName>
            <RateWrapper>
              <Rate disabled allowHalf defaultValue={+item.rate} />
              <RateNumber>({item.rate})</RateNumber>
            </RateWrapper>
            <ItemBottom>
              <ItemPrice>{item.price} $</ItemPrice>
              <Notification
                button={
                  <AddButton onClick={() => handleAddItem(item)}>
                    <ShoppingCartOutlined /> Add
                  </AddButton>
                }
                messageType={"successful"}
                messageContent={"add to cart"}
              />
            </ItemBottom>
          </ItemWrapper>
        ))}
      </ListItemWrapper>
    </Container>
  );
};

export default ListItem;
