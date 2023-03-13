import React, { useState } from "react";
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
import ListItem from "components/common/ListItem/ListItem";
import images from "assets/images";
import Navigation from "components/common/Navigation/Pagination";
import useProduct from "hooks/useProduct";
import ProductSideBar from "./components/ProductSideBar";
import Loading from "components/common/Loading/Loading";
const Product = () => {
  const { productData, totalItem, itemPerPage, productQuery } = useProduct();
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  return (
    <Container>
      <Overlay isShow={showSideBar} />
      <BannerWrapper>
        <Banner src={images.productBanner} />
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
