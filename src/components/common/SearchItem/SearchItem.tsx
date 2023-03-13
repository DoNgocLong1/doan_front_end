import { SearchOutlined } from "@ant-design/icons";
import { fetchProduct } from "apiServices/productService";
import React, { useEffect, useRef, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { IconWrapper, SearchInput, SearchWrapper } from "./SearchItem.styled";
const SearchItem = () => {
  const searchRef = useRef<HTMLDivElement>();
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  const handleSearch = (): void => {
    navigate({
      pathname: "/product",
      search: createSearchParams({
        ...params,
        search: search,
      }).toString(),
    });
    fetchProduct(params);
  };
  useEffect(() => {
    const pressEnterToSearch = (e: any) => {
      if (e.keyCode == 13) {
        handleSearch();
      }
    };
    searchRef.current?.addEventListener("keypress", pressEnterToSearch);
    return () => {
      searchRef.current?.removeEventListener("keypress", pressEnterToSearch);
    };
  });
  return (
    <SearchWrapper>
      <SearchInput
        placeholder="input search"
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        ref={searchRef}
      />
      <IconWrapper onClick={handleSearch}>
        <SearchOutlined />
      </IconWrapper>
    </SearchWrapper>
  );
};

export default SearchItem;
