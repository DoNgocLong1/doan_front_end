import { selectCartList } from "@/features/cart/cartSlice";
import images from "@/images";
import {
  ExportOutlined,
  HistoryOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ListItemLite from "../common/ListItemLite/ListItemLite";
import PropDown from "../common/PropDown/PropDown";
import SearchItem from "../common/SearchItem/SearchItem";
import {
  Container,
  Feature,
  FeatureLink,
  FeatureTitle,
  FeatureWrapper,
  IconWrapper,
  Logo,
  LogoWrapper,
  Quantity,
  QuantitySpan,
  SearchWrapper,
  UserFeature,
  UserFeatureIcon,
  UserFeatureName,
  UserFeatureWrapper,
  UserImg,
} from "./Header.styled";
const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  const [show, setShow] = useState<boolean>(false);
  const user = {};
  const userAvatar = "";
  return (
    <Feature>
      <UserImg
        src={userAvatar}
        onClick={() => {
          setShow((prev) => (prev ? false : true));
        }}
      />
      <PropDown isShow={show} translateX="-55%">
        <UserFeature>
          <Link href="/account">
            <UserFeatureWrapper>
              <UserFeatureIcon>
                <UserOutlined />
              </UserFeatureIcon>
              <UserFeatureName>Profile</UserFeatureName>
            </UserFeatureWrapper>
          </Link>
          <UserFeatureWrapper>
            <UserFeatureIcon>
              <ExportOutlined />
            </UserFeatureIcon>
            <UserFeatureName onClick={handleLogout}>Logout</UserFeatureName>
          </UserFeatureWrapper>
          <UserFeatureWrapper>
            <UserFeatureIcon>
              <HistoryOutlined />
            </UserFeatureIcon>
            <UserFeatureName>Orders history </UserFeatureName>
          </UserFeatureWrapper>
        </UserFeature>
      </PropDown>
    </Feature>
  );
};
const Header = () => {
  const { listLength } = useSelector(selectCartList);
  const [show, setShow] = useState<boolean>(false);
  const token = "token";
  return (
    <Container>
      <Link href="/">
        <Logo src={images.logo.src} />
        <LogoWrapper>
          <HomeOutlined />
        </LogoWrapper>
      </Link>
      <SearchWrapper>
        <SearchItem />
      </SearchWrapper>
      <FeatureWrapper>
        <Feature>
          <IconWrapper
            onClick={() => {
              setShow((prev) => (prev ? false : true));
            }}
          >
            <ShoppingCartOutlined />
          </IconWrapper>
          <FeatureTitle>Cart</FeatureTitle>
          <QuantitySpan>
            <Quantity>{listLength}</Quantity>
          </QuantitySpan>
          <PropDown isShow={show} translateX="-70%">
            <ListItemLite />
          </PropDown>
        </Feature>
        {token ? (
          <Logout />
        ) : (
          <FeatureLink href="/login">
            <Feature>
              <IconWrapper>
                <UserOutlined />
              </IconWrapper>
              <FeatureTitle>Login</FeatureTitle>
            </Feature>
          </FeatureLink>
        )}
      </FeatureWrapper>
    </Container>
  );
};
export default Header;
