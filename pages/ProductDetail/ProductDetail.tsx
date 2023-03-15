import { Rate } from "antd";
import { productDetail } from "@/apiServices/productService";
import Loading from "@/components/common/Loading/Loading";
import DOMPurify from "dompurify";
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
} from "./ProductDetail.styled";
import { useRouter } from "next/router";

const ProductDetail = () => {
  const router = useRouter();
  const productId = router.query?.id || 0;
  const desRef = useRef<any>();
  const { data, isLoading } = useQuery({
    queryKey: ["productDetail"],
    queryFn: () => productDetail(+productId),
  });
  const productDetailData = data?.data.data;
  const [img, setImg] = useState<string>(
    productDetailData?.images[0]?.product_img
  );
  console.log(productDetailData);
  console.log(desRef.current);
  if (isLoading) return <Loading />;
  if (!productDetailData) return null;
  return (
    <Container>
      <ProductDetailWrapper>
        <ProductGalleryWrapper>
          <ProductMainImg src={img} />
          <GalleryWrapper>
            {productDetailData?.images.map((item: any, index: number) => (
              <GalleryImg
                onMouseOver={() => setImg(item.product_img)}
                key={index}
                src={item.product_img}
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
          </SpecificationsContainer>
        </ProductInfoWrapper>
      </ProductDetailWrapper>
      <ProductDescription
        ref={desRef}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(productDetailData.description),
        }}
      ></ProductDescription>
    </Container>
  );
};

export default ProductDetail;
