import breakPoints from "@/constants/breakpoint";
import color from "@/utils/color";
import styled from "styled-components";
import { IListItem } from "./ListItem";
export const Container = styled.div`
  width: 100%;
  @media ${breakPoints.mobile} {
    padding: 0;
    font-size: 6px;
  }
`;
export const ListItemWrapper = styled.div<IListItem>`
  margin: auto;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.ItemPerRow},
    ${(props) => props.size}
  );
  row-gap: 2em;
  column-gap: 2em;
  @media ${breakPoints.tablet} {
    grid-template-columns: repeat(
      ${(props) =>
    props.ItemPerRowOnTablet},
      ${(props) => props.size}
    );
  }
  @media ${breakPoints.mobile} {
    grid-template-columns: repeat(
      ${(props) =>
    props.ItemPerRowOnMobile},
      ${(props) => props.size}
    );
  }
`;
export const ProductActionWrapper = styled.ul`
  list-style: none;
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  border-radius: 1em;
  overflow: hidden;
  transform: translate(-50%, -50%);
`;
export const ProductAction = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 4em;
  height: 4em;
  border-left: 0.1em solid ${color.backgroundItemColor};
  background-color: ${color.whiteColor};
  opacity: 0;
  transition: ease 0.25s;
  cursor: pointer;
  &:nth-of-type(1) {
    border-left: unset;
  }
`;
export const ItemImageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em 0%;
  &:hover {
    ${ProductAction} {
      opacity: 0.8;
    }
  }
`;
export const ItemImage = styled.img`
  width: 70%;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  transition: ease 0.25s;
`;
export const ItemType = styled.span`
  padding: 0.5em;
  font-size: 1em;
  color: rgb(173, 173, 173);
`;
export const ItemName = styled.span`
  font-size: 1.5em;
  color: ${color.whiteColor};
  margin-bottom: 1em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  height: 2em;
  line-height: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  opacity: 1;
  transition: ease 0.25s;
  &:hover {
    color: ${color.orange};
  }
`;
export const RateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const RateNumber = styled.span`
  color: ${color.whiteColor};
  font-size: 1.5em;
`;
export const ItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const ItemPrice = styled.span`
  font-weight: bold;
  font-size: 1.5em;
  color: ${color.orange};
`;
export const AddButton = styled.button`
  background-color: initial;
  border: 0.1em solid ${color.whiteColor};
  border-radius: 0.5em;
  color: ${color.whiteColor};
  font-size: 1.1em;
  font-weight: 700;
  padding: 0.5em;
  transition: all 0.2s linear;
  &:hover {
    background-color: ${color.whiteColor};
    color: #000;
  }
`;
export const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2em 1.5em;
  background-color: ${color.backgroundItemColor};
  border-radius: 1.5em;
  position: relative;
  z-index: 1;
  //border: 2px solid #e7e765;
  .ant-rate {
    font-size: 1.5em;
  }
  .ant-rate-star {
    margin-inline-end: unset !important;
  }
  .ant-rate-star-zero svg,
  .ant-rate-star-half .ant-rate-star-second svg {
    opacity: 0.8;
  }
  &:hover {
    ${ItemImage} {
      transform: scale(1.2);
    }
  }
`;
export const Discount = styled.div`
  z-index: 2;
  background-color: #ce373a;
  position: absolute;
  padding: 0.7em 1.5em;
  border-radius: 35% 15%;
  color: ${color.whiteColor};
  top: -0.5em;
  left: -0.5em;
  font-size: 1.3em;
  display: flex;
  justify-content: center;
  align-items: center;
`;
