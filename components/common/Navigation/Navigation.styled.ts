import color from "@/utils/color";
import styled from "styled-components";
export const Container = styled.div`
  background-color: ${color.backgroundColor} !important;
  width: 100%;
  color: ${color.whiteColor};
  .ant-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ant-pagination-item,
  .ant-pagination-item-link {
    border: 1px solid ${color.whiteColor} !important;
    padding: 0.5em 0.7em !important;
    height: 100% !important;
    transition: 0.25s ease !important;
    a {
      color: ${color.whiteColor};
    }
    :hover a {
      color: #000;
      font-weight: bold;
    }
    :hover {
      color: #000;
      background-color: ${color.whiteColor} !important;
    }
  }
  .ant-pagination li {
    height: 100%;
  }
  .ant-pagination-item-link {
    padding: 1em 1.3em !important;
    :hover span {
      color: #000;
      font-weight: bold;
    }
    span {
      color: ${color.whiteColor};
      font-size: 1.2em;
    }
  }
  .ant-pagination-item-active a {
    color: #000;
    font-weight: bold;
  }
  .ant-select-selector {
    display: none;
  }
  .ant-pagination-item-container .ant-pagination-item-ellipsis {
    display: flex !important;
    justify-content: center;
    color: #fff !important;
  }
  .ant-pagination-item-link {
    display: flex;
    justify-content: center;
    border: none !important;
    height: fit-content;
  }
`;
