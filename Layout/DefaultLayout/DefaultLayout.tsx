
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "./DefaultLayout.styled";
interface IDefaultLayout {
  children: React.ReactNode;
}
const DefaultLayout = ({ children }: IDefaultLayout) => {
  const { pathname } = useRouter();
  return (
    <>
      {pathname === "/login" || pathname === "/registry" ? (
        <>
          {children}
        </>
      ) : (
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      )}
    </>
  );
};

export default DefaultLayout;
