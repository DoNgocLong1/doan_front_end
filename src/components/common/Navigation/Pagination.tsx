import { Pagination, PaginationProps } from "antd";
import useUrlParams from "hooks/useUrlParams";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "./Navigation.styled";
interface INavigation {
  totalItem: number;
  itemPerPage: number;
}
const PaginationBar = ({ totalItem, itemPerPage = 12 }: INavigation) => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const pageNumber: number = Number(params.page) || 1;
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
