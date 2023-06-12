import React from "react";
import {
  Banner,
  BannerContent,
  BannerDescription,
  BannerImg,
  BannerWrapper,
  BrowserCategories,
  BrowserCategoriesTitle,
  CategoriesWrapper,
  CategoryItem,
  CategoryItemImg,
  CategoryItemImgWrapper,
  CategoryTitle,
  Container,
  FilterWrapper,
  PopularProductHeader,
  PopularProductTitle,
  PopularProductWrapper,
  ShopNowButton,
} from "../styled/Home.styled";
import { ArrowRightOutlined } from "@ant-design/icons";
import { IdataCategory } from "@/types/productType.type";
import useCategory from "@/hooks/useCategory";
import useProduct from "@/hooks/useProduct";
import { useRouter } from "next/router";
import Link from "next/link";
import ListItem from "@/components/common/ListItem/ListItem";
import images from "@/images";
import SlideShow from "@/components/slideShow";
import Head from "next/head";

const Home = () => {
  const { categoryData } = useCategory();
  const route = useRouter();
  const { popularProductData } = useProduct();
  const handleGotoProductByCategory = (id: number) => {
    route.push({
      pathname: "/product",
      query: {
        category: id.toString(),
      }
    });
  };
  const router = useRouter()
  /* const convertVariableToString = (): any => {
    const val = JSON.parse(`{"img" : "images.laptopCategory"}`);
    return val;
  }; */
  return (
    <>
      <Head>
        <title>Predator</title>
        <meta data-n-head="ssr" data-hid="description" name="description" content="homepage" />
        <link
          data-n-head="ssr"
          rel="canonical"
          href=""
          key="canonical"
        />
      </Head>
      <Container>
        <SlideShow />
        <BannerWrapper>
          <Banner>
            <Link href="/product" scroll={false}>
              <ShopNowButton>
                Shop now <ArrowRightOutlined />
              </ShopNowButton>
            </Link>
            <BannerImg src={images.laptopBanner.src} alt="banner" title="banner" width="250" height="180" />
            <BannerDescription>
              <BannerContent>
                Play wherever you want, with a slimmer laptop powered by the
                latest hardware.
              </BannerContent>
            </BannerDescription>
          </Banner>
          <Banner>
            <Link href="/product" scroll={false}>
              <ShopNowButton>
                Shop now <ArrowRightOutlined />
              </ShopNowButton>
            </Link>
            <BannerImg src={images.monitorBanner.src} alt="banner" title="banner" width="250" height="180" />
            <BannerDescription>
              <BannerContent>
                Your game monitor should be the best, whether curved, flat, 4K or
                FHD.
              </BannerContent>
            </BannerDescription>
          </Banner>
          <Banner>
            <Link href="/product" scroll={false}>
              <ShopNowButton>
                Shop now <ArrowRightOutlined />
              </ShopNowButton>
            </Link>
            <BannerImg src={images.accessoryBanner.src} alt="banner" title="banner" width="250" height="180" />
            <BannerDescription>
              <BannerContent>
                Outfit your setup with super responsive mice, mechanical
                keyboards, sound-rich headphones, and comfortable gaming chairs.
              </BannerContent>
            </BannerDescription>
          </Banner>
        </BannerWrapper>
        <BrowserCategories>
          <BrowserCategoriesTitle>Browser categories</BrowserCategoriesTitle>
          <CategoriesWrapper>
            {categoryData?.map((item: IdataCategory, index: number) => (
              <CategoryItem
                key={index}
                onClick={() => handleGotoProductByCategory(item.id)}
              >
                <CategoryTitle>{item.name}</CategoryTitle>
                <CategoryItemImgWrapper>
                  <CategoryItemImg
                    src={item.image}
                    alt={item.name}
                    width="250"
                    height="250"
                  />
                </CategoryItemImgWrapper>
              </CategoryItem>
            ))}
          </CategoriesWrapper>
        </BrowserCategories>
        {/* PopularProduct */}
        <PopularProductWrapper>
          <PopularProductHeader>
            <PopularProductTitle>Popular Products</PopularProductTitle>
          </PopularProductHeader>
          <ListItem data={popularProductData} />
        </PopularProductWrapper>
      </Container>
    </>
  );
};

export default Home;
