import useUrlParams from "@/hooks/useUrlParams";
import { Pagination, PaginationProps } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container } from "./Navigation.styled";
interface INavigation {
  totalItem: number;
  itemPerPage: number;
}
const PaginationBar = ({ totalItem, itemPerPage = 12 }: INavigation) => {
  const { query } = useRouter()
  const pageNumber: number = Number(query.page) || 1;
  const [current, setCurrent] = useState(pageNumber);
  const { transmissionPages } = useUrlParams();
  useEffect(() => {
    setCurrent(pageNumber)
  }, [query, pageNumber])
  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
    transmissionPages("page", page);
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
