import {
  DollarCircleOutlined,
  FallOutlined,
  FieldTimeOutlined,
  FontColorsOutlined,
  MenuUnfoldOutlined,
  RadarChartOutlined,
  RiseOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps, Slider } from "antd";
import useCategory from "@/hooks/useCategory";
import useProduct from "@/hooks/useProduct";
import useUrlParams from "@/hooks/useUrlParams";
import React, { useState } from "react";
import { IdataCategory } from "@/types/productType.type";
import {
  CategoriesContainer,
  CategoryIconWarper,
  CategoryImg,
  CategoryImgWarper,
  CategoryName,
  CategoryWrapper,
  CategoryWrapperActive,
  SideBar,
  SideBarButton,
  SideBarToggle,
  Title,
} from "./ProductSideBar.styled";
const ProductSideBar = ({ showSideBar }: any) => {
  const categoryData: IdataCategory[] = useCategory();
  const handleFilter = (tag: number): void => {
    transmissionParams("category", tag);
  };
  const { transmissionParams, twoKeysTransmissionParams } = useUrlParams();
  const { minPrice, maxPrice } = useProduct();
  type MenuItem = Required<MenuProps>["items"][number];
  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };
  const items: MenuItem[] = [
    getItem("Time", "sub1", <FieldTimeOutlined />, [
      getItem(
        <SideBarButton onClick={() => transmissionParams("time", "newest")}>
          Newest
        </SideBarButton>,
        "1"
      ),
      getItem(
        <SideBarButton onClick={() => transmissionParams("time", "oldest")}>
          Oldest
        </SideBarButton>,
        "2"
      ),
    ]),
    getItem("Character", "sub2", <FontColorsOutlined />, [
      getItem(
        <SideBarButton onClick={() => transmissionParams("sort", "az")}>
          <SortAscendingOutlined /> A-Z
        </SideBarButton>,
        "3"
      ),
      getItem(
        <SideBarButton onClick={() => transmissionParams("sort", "za")}>
          <SortDescendingOutlined /> Z-A
        </SideBarButton>,
        "4"
      ),
    ]),
    getItem("Price", "sub4", <DollarCircleOutlined />, [
      getItem(
        <SideBarButton onClick={() => transmissionParams("price", "increase")}>
          <RiseOutlined /> Increase
        </SideBarButton>,
        "5"
      ),
      getItem(
        <SideBarButton onClick={() => transmissionParams("price", "decrease")}>
          <FallOutlined /> Decrease
        </SideBarButton>,
        "6"
      ),
      getItem(
        <Slider
          range={{ draggableTrack: true }}
          defaultValue={[minPrice, maxPrice]}
          min={minPrice}
          max={maxPrice}
          onChange={(e: any) =>
            twoKeysTransmissionParams("price_from", e[0], "price_to", e[1])
          }
        />,
        "7"
      ),
    ]),
  ];
  const [categoryActive, setCategoryActive] = useState<number>(0);
  console.log(categoryActive);
  return (
    <SideBar>
      <SideBarToggle
        onClick={() => {
          showSideBar((prev: any) => (prev ? false : true));
        }}
      >
        <MenuUnfoldOutlined />
      </SideBarToggle>
      <CategoriesContainer>
        <Title>Category</Title>
        {categoryActive === 0 ? (
          <CategoryWrapperActive>
            <CategoryIconWarper>
              <RadarChartOutlined />
            </CategoryIconWarper>
            <CategoryName>All</CategoryName>
          </CategoryWrapperActive>
        ) : (
          <CategoryWrapper onClick={() => handleFilter(0)}>
            <CategoryIconWarper>
              <RadarChartOutlined />
            </CategoryIconWarper>
            <CategoryName>All</CategoryName>
          </CategoryWrapper>
        )}
        {categoryData?.map((item: IdataCategory, index: number) =>
          categoryActive === item.id ? (
            <CategoryWrapperActive key={index}>
              <CategoryImgWarper>
                <CategoryImg src={item.image} alt={item.name} />
              </CategoryImgWarper>
              <CategoryName>{item.name}</CategoryName>
            </CategoryWrapperActive>
          ) : (
            <CategoryWrapper
              key={index}
              onClick={() => {
                handleFilter(item.id);
                setCategoryActive(item.id);
              }}
            >
              <CategoryImgWarper>
                <CategoryImg src={item.image} alt={item.name} />
              </CategoryImgWarper>
              <CategoryName>{item.name}</CategoryName>
            </CategoryWrapper>
          )
        )}
      </CategoriesContainer>
      <br />
      <Menu
        style={{ width: "100%" }}
        defaultOpenKeys={["sub2"]}
        mode="inline"
        items={items}
      />
    </SideBar>
  );
};
export default ProductSideBar;
