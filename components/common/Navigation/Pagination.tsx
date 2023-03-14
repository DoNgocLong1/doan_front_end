import useUrlParams from "@/hooks/useUrlParams";
import { Pagination, PaginationProps } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Container } from "./Navigation.styled";
interface INavigation {
  totalItem: number;
  itemPerPage: number;
}
const PaginationBar = ({ totalItem, itemPerPage = 12 }: INavigation) => {
  const router = useRouter()
  const pageNumber: number = Number(router.query.page) || 1;
  const [current, setCurrent] = useState(pageNumber);
  const { transmissionParams } = useUrlParams();
  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
    transmissionParams("page", page);
  };
  return (
    <Container>
      <Pagination
        current={current}
        pageSize={itemPerPage}
        onChange={onChange}
        total={totalItem}
        defaultCurrent={1}
      />
    </Container>
  );
};

export default PaginationBar;
