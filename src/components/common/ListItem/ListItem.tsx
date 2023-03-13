//import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { addItem } from "features/cart/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { CartItemType } from "types/cartType.type";
import { IProductItem } from "types/productType.type";
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
interface IListItem {
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
  const navigate = useNavigate();
  const goToProductDetailPage = (id: number): void => {
    navigate({
      pathname: "/product/detail",
      search: createSearchParams({
        id: String(id),
      }).toString(),
    });
  };
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
                onClick={() => goToProductDetailPage(item.id)}
                src={"/static/media/" /* + item.Image_Products.image || "" */}
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
            <ItemName onClick={() => goToProductDetailPage(item.id)}>
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
