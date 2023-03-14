import ListItem from "@/components/common/ListItem/ListItem";
import Loading from "@/components/common/Loading/Loading";
import useProduct from "@/hooks/useProduct";
import React, { useState } from "react";
import ProductSideBar from "./components/ProductSideBar";
import Navigation from "../../components/common/Navigation/Pagination";
import {
  Banner,
  BannerTitle,
  BannerWrapper,
  Container,
  ListProductContainer,
  Overlay,
  ProductContainer,
  SideBarContainer,
} from "./Product.styled";
import images from "@/images";

const Product = () => {
  const { productData, totalItem, itemPerPage, productQuery } = useProduct();
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  return (
    <Container>
      <Overlay isShow={showSideBar} />
      <BannerWrapper>
        <Banner src={images.productBanner.src} />
        <BannerTitle> Product </BannerTitle>
      </BannerWrapper>
      <ProductContainer>
        <SideBarContainer isShow={showSideBar}>
          <ProductSideBar showSideBar={setShowSideBar} />
        </SideBarContainer>
        <ListProductContainer>
          {productQuery.isLoading ? (
            <Loading />
          ) : (
            <ListItem
              data={productData}
              ItemPerRow={4}
              ItemPerRowOnMobile={2}
              ItemPerRowOnTablet={3}
              size="1fr"
            />
          )}
        </ListProductContainer>
      </ProductContainer>
      <Navigation totalItem={totalItem} itemPerPage={itemPerPage} />
    </Container>
  );
};

export default Product;
