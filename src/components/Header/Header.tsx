import {
  ExportOutlined,
  HistoryOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import images from "assets/images";
import ListItemLite from "components/common/ListItemLite/ListItemLite";
import PropDown from "components/common/PropDown/PropDown";
import SearchItem from "components/common/SearchItem/SearchItem";
import { selectCartList } from "features/cart/cartSlice";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const [show, setShow] = useState<boolean>(false);
  const user = localStorage.getItem("user");
  const userAvatar = JSON.parse(user || "").user_img;
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
          <Link to="/account">
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
  const token = localStorage.getItem("token");
  return (
    <Container>
      <Link to="/">
        <Logo src={images.logo} />
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
          <FeatureLink to="/login">
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
