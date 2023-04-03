import ListItem from "@/components/common/ListItem/ListItem";
import Loading from "@/components/common/Loading/Loading";
import useProduct from "@/hooks/useProduct";
import React, { useEffect, useState } from "react";
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
} from "../../styled/Product.styled";
import images from "@/images";
import { useRouter } from "next/router";
import ProductSideBar from "@/components/Product/ProductSideBar";

const Product = () => {
  const { productData, totalItem, itemPerPage, productQuery } = useProduct();
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const {query} = useRouter();
  useEffect(() => {
    const onScroll = () => {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
    onScroll()
    return () => window.removeEventListener("scroll", onScroll);
  }, [query]);
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
