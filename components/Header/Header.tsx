import { logout, selectAuth } from "@/features/auth/authSlice";
import { selectCartList } from "@/features/cart/cartSlice";
import images from "@/images";
import { Iuser } from "@/types/index.type";
import {
  ExportOutlined,
  HistoryOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, use } from "react";
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
  UserName,
} from "./Header.styled";
const Logout = ({ setIsLogin }: any) => {
  const { isAuthenticated } = useSelector(selectAuth);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logout(!isAuthenticated));
    setIsLogin(false)
    router.push("/");
  };
  const [image, setImage] = useState<string>();
  const [userData, setUserData] = useState<Iuser>({
    email: '',
    roleId: '',
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('user') || '');
      const image = data.image
      setImage(image)
      delete data.image;
      setUserData(data);
    }
  }, [])
  const [show, setShow] = useState<boolean>(false);
  return (
    <Feature>
      <UserImg
        src={image}
        alt="avatar"
        title="avatar"
        width="50"
        height="50"
        onClick={() => {
          setShow((prev) => (prev ? false : true));
        }}
      />
      <UserName>{userData?.firstname}  {userData?.lastname}</UserName>
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
  const [token, setToken] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getToken = localStorage.getItem('token') || ''
      if (getToken) {
        setToken(getToken)
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    }
  }, [token, isLogin])
  return (
    <Container>
      <Link href="/">
        <Logo src={images.logo.src} alt="logo" title="logo" width="140" height="50" />
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
        {isLogin ? (
          <Logout setIsLogin={setIsLogin} />
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
