import images from "assets/images";
import ListItem from "components/common/ListItem/ListItem";
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
} from "./Home.styled";
import { ArrowRightOutlined } from "@ant-design/icons";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { IdataCategory } from "types/productType.type";
import useCategory from "hooks/useCategory";
import useProduct from "hooks/useProduct";
import SlideShow from "components/slideShow";
const Home = () => {
  const categoryData: IdataCategory[] = useCategory();
  console.log(categoryData);
  const { popularProductData } = useProduct();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const handleGotoProductByCategory = (id: number) => {
    navigate({
      pathname: "/product",
      search: createSearchParams({
        ...params,
        category: String(id),
      }).toString(),
    });
  };
  /* const convertVariableToString = (): any => {
    const val = JSON.parse(`{"img" : "images.laptopCategory"}`);
    return val;
  }; */
  return (
    <Container>
      <SlideShow />
      <BannerWrapper>
        <Banner>
          <Link to="/product">
            <ShopNowButton>
              Shop now <ArrowRightOutlined />
            </ShopNowButton>
          </Link>
          <BannerImg src={images.laptopBanner} />
          <BannerDescription>
            <BannerContent>
              Play wherever you want, with a slimmer laptop powered by the
              latest hardware.
            </BannerContent>
          </BannerDescription>
        </Banner>
        <Banner>
          <Link to="/product">
            <ShopNowButton>
              Shop now <ArrowRightOutlined />
            </ShopNowButton>
          </Link>
          <BannerImg src={images.monitorBanner} />
          <BannerDescription>
            <BannerContent>
              Your game monitor should be the best, whether curved, flat, 4K or
              FHD.
            </BannerContent>
          </BannerDescription>
        </Banner>
        <Banner>
          <Link to="/product">
            <ShopNowButton>
              Shop now <ArrowRightOutlined />
            </ShopNowButton>
          </Link>
          <BannerImg src={images.accessoryBanner} />
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
                  src={"/static/media/" + item.image}
                  alt={item.name}
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
          <FilterWrapper>brtntnrt</FilterWrapper>
        </PopularProductHeader>
        <ListItem data={popularProductData} />
      </PopularProductWrapper>
    </Container>
  );
};

export default Home;
