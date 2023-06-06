import { getUser } from "@/apiServices/userServices";
import { logout, selectAuth } from "@/features/auth/authSlice";
import { selectCartList } from "@/features/cart/cartSlice";
import useUser from "@/hooks/useUser";
import images from "@/images";
import { Iuser } from "@/types/index.type";
import {
  AliwangwangOutlined,
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
import useShowDropDown from "@/hooks/useShowDropDown";
import { getCookie } from "@/helper";
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

  const [userData, setUserData] = useState<any>({});
  const handleFetchUser = async () => {
    const token = getCookie('token');
    const fetchUser = await getUser(token);
    setUserData(fetchUser?.data || {})
  }
  useEffect(() => {
    handleFetchUser()
  }, [])
  //const [show, setShow] = useState<boolean>(false);
  const { isShowUserMenu, handleShowUserMenu } = useShowDropDown()

  return (
    <Feature>
      <UserImg
        src={userData.image || '/user.png'}
        alt="avatar"
        title="avatar"
        width="50"
        height="50"
        onClick={handleShowUserMenu}
      />
      <UserName>{userData?.fullName || ''}  </UserName>
      <PropDown isShow={isShowUserMenu} translateX="-55%">
        <UserFeature onClick={handleShowUserMenu}>
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
          <Link href="/orders-history">
            <UserFeatureWrapper>
              <UserFeatureIcon>
                <HistoryOutlined />
              </UserFeatureIcon>
              <UserFeatureName>Orders history </UserFeatureName>
            </UserFeatureWrapper>
          </Link>
          {userData.roleId === 1 &&
            <Link href="/admin">
              <UserFeatureWrapper>
                <UserFeatureIcon>
                  <AliwangwangOutlined />
                </UserFeatureIcon>

                <UserFeatureName >Admin</UserFeatureName>
              </UserFeatureWrapper>
            </Link>
          }
        </UserFeature>
      </PropDown>
    </Feature>
  );
};
const Header = () => {
  const { listLength } = useSelector(selectCartList);
  const [token, setToken] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { isShowCart, handleShowCart } = useShowDropDown();
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
            onClick={handleShowCart}
          >
            <ShoppingCartOutlined />
          </IconWrapper>
          <FeatureTitle>Cart</FeatureTitle>
          <QuantitySpan>
            <Quantity>{listLength}</Quantity>
          </QuantitySpan>
          <PropDown isShow={isShowCart} translateX="-70%">
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
