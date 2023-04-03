import { logout, selectAuth } from "@/features/auth/authSlice";
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
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { isAuthenticated } = useSelector(selectAuth);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logout(!isAuthenticated));
    router.push("/");
  };
  const [ image, setImage] = useState();
  useEffect(() => {
    if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user') || ''
    const image = JSON.parse(userData).image
    console.log(image);
    setImage(image)
    }
  }, [])
  const [show, setShow] = useState<boolean>(false);
  const userAvatar = "";
  return (
    <Feature>
      <UserImg
        src={image}
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
  const { isAuthenticated } = useSelector(selectAuth);
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
        {isAuthenticated ? (
          <Logout />
        ) : (     
          <FeatureLink>
            <Feature>
              <IconWrapper>
                <UserOutlined />
              </IconWrapper>
              <Link href="/login">
                <FeatureTitle>Login</FeatureTitle>
              </Link>
            </Feature>
          </FeatureLink>
        )}
      </FeatureWrapper>
    </Container>
  );
};

export default Header;
