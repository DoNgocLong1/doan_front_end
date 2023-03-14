import { fetchProduct } from "@/apiServices/productService";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { IconWrapper, SearchInput, SearchWrapper } from "./SearchItem.styled";
const SearchItem = () => {
  const searchRef = useRef<any>();
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const handleSearch = (): void => {
    router.push({
      pathname: "/product",
      query: {
        search
      }
    });
    fetchProduct(router);
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
