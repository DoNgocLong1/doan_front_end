import React, { useRef } from "react";
import { Carousel } from "antd";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import color from "@/utils/color";
import { slideShow } from "@/images";
const contentStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain",
  color: "${color.whiteColor}",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const SliderCarousel = styled(Carousel)`
  position: relative;
  button{
    width: 5em;
    height: 5em;
  }
`;
const Container = styled.div`
  height: 100%;
  position: relative;
`;
const PrevSliderButton = styled.button`
  background: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  padding: 1em 0.5em;
  color: ${color.whiteColor};
  outline: none;
  border: none;
  transition: 0.5s ease;
  :hover {
    background-color: #352e2e;
    opacity: 0.8;
  }
`;
const NextSliderButton = styled(PrevSliderButton)`
  right: 10px;
  left: unset;
`;
const SlideShow: React.FC = () => {
  const carouselRef: any = useRef<HTMLDivElement>();
  return (
    <Container>
      <Carousel autoplay ref={carouselRef}>
        {slideShow.map((item: any, index: number) => (
          <div key={index}>
            <img style={contentStyle} src={item.src} alt="slide show" title="slideshow" width="1281" height="541" />
          </div>
        ))}
      </Carousel>
      <PrevSliderButton onClick={() => carouselRef.current.prev()}>
        <LeftOutlined style={{ fontSize: "3em" }} />
      </PrevSliderButton>
      <NextSliderButton onClick={() => carouselRef.current.next()}>
        <RightOutlined style={{ fontSize: "3em" }} />
      </NextSliderButton>
    </Container>
  );
};

export default SlideShow;
