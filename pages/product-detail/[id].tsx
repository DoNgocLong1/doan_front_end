import { Rate } from "antd";
import { getProductDetail } from "@/apiServices/productService";
import Loading from "@/components/common/Loading/Loading";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  Container,
  ProductDetailWrapper,
  ProductGalleryWrapper,
  ProductInfoWrapper,
  ProductMainImg,
  ProductName,
  RateWrapper,
  RateNumber,
  SpecificationDetail,
  SpecificationName,
  SpecificationsContainer,
  SpecificationWrapper,
  GalleryWrapper,
  GalleryImg,
  ProductDescription,
  RecommendContainer,
  RecommendProduct,
  AddToCartButton,
  ItemPrice,
} from "../../styled/ProductDetail.styled";
import { useRouter } from "next/router";
import { isConstructorDeclaration } from "typescript";
import ListItem from "@/components/common/ListItem/ListItem";
import useProduct from "@/hooks/useProduct";
import { useDispatch } from "react-redux";
import { addItem } from "@/features/cart/cartSlice";
import { CartItemType } from "@/types/cartType.type";
import Head from "next/head";

export const getServerSideProps = async (contexts: any) => {
  const { id } = contexts.query
  const fetchDetail: any = await getProductDetail(id)
  return {
    props: {
      data: fetchDetail?.data || {}
    }
  }
}
const ProductDetail = ({ data }: any) => {
  const router = useRouter();
  const { product, images } = data;
  const desRef = useRef<any>();
  const productDetailData = product;
  const { popularProductData } = useProduct();
  const [img, setImg] = useState<string>(images?.[0]?.image || '');
  const dispatch = useDispatch();
  const handleAddItem = (): void => {
    console.log(product)
    const payloadData: CartItemType = {
      id: product.id,
      img: images?.[0]?.image || '',
      name: product.name,
      price: +product.price,
    };
    dispatch(addItem(payloadData));
  };
  if (!productDetailData) return null;
  return (
    <>
      <Head>
        <title>{productDetailData.name}</title>
        <meta data-n-head="ssr" data-hid="description" name="description" content={productDetailData.name} />
        <link
          data-n-head="ssr"
          rel="canonical"
          href=""
          key="canonical"
        />
      </Head>
      <Container>
        <ProductDetailWrapper>
          <ProductGalleryWrapper>
            <ProductMainImg
              src={img}
              title={productDetailData.name}
              alt={productDetailData.name}
              width="400"
              height="400"
            />
            <GalleryWrapper>
              {images?.map((item: any, index: number) => (
                <GalleryImg
                  onMouseOver={() => setImg(item?.image || '')}
                  key={index}
                  src={item?.image || ''}
                  title={productDetailData.name}
                  alt={productDetailData.name}
                  width="400"
                  height="400"
                />
              ))}
            </GalleryWrapper>
          </ProductGalleryWrapper>
          <ProductInfoWrapper>
            <ProductName>{productDetailData.name}</ProductName>
            <RateWrapper>
              <Rate disabled allowHalf defaultValue={+productDetailData.rate} />
              <RateNumber>({productDetailData.rate})</RateNumber>
            </RateWrapper>
            <SpecificationsContainer>
              <SpecificationWrapper>
                <SpecificationName>Brand:</SpecificationName>
                <SpecificationDetail>
                  {productDetailData.brand}
                </SpecificationDetail>
              </SpecificationWrapper>
              <SpecificationWrapper>
                <SpecificationName>Type:</SpecificationName>
                <SpecificationDetail>
                  {productDetailData.type}
                </SpecificationDetail>
              </SpecificationWrapper>
              <SpecificationWrapper>
                <SpecificationName>Price:</SpecificationName>
                <ItemPrice>
                  {productDetailData.price}
                </ItemPrice>
              </SpecificationWrapper>
              <AddToCartButton onClick={handleAddItem}>
                Add To Cart
              </AddToCartButton>
            </SpecificationsContainer>
          </ProductInfoWrapper>
        </ProductDetailWrapper>
        <ProductDescription
          ref={desRef}
          dangerouslySetInnerHTML={{ __html: productDetailData.description }}
        ></ProductDescription>
        <RecommendContainer>
          <RecommendProduct>Recommend Product</RecommendProduct>
          <ListItem data={popularProductData} />
        </RecommendContainer>
      </Container>
    </>
  );
};

export default ProductDetail;
