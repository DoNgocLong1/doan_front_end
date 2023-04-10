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
import Head from "next/head";

const Product = () => {
  const { productData, totalItem, itemPerPage, productQuery } = useProduct();
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const { query } = useRouter();
  useEffect(() => {
    const onScroll = () => {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
    onScroll()
    return () => window.removeEventListener("scroll", onScroll);
  }, [query]);
  return (
    <>
      <Head>
        <title>Predator-Product</title>
        <meta data-n-head="ssr" data-hid="description" name="description" content="product page" />
      </Head>
      <Container>
        <Overlay isShow={showSideBar} />
        <BannerWrapper>
          <Banner src={images.productBanner.src} alt="banner" title="banner" width="1281" height="641" />
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
              />
            )}
          </ListProductContainer>
        </ProductContainer>
        <Navigation totalItem={totalItem} itemPerPage={itemPerPage} />
      </Container>

    </>
  );
};

export default Product;
