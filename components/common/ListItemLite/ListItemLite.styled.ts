import color from "@/utils/color";
import styled from "styled-components";
export const Container = styled.div`
  width: 100%;
  color: #000;
  width: 25em;
  padding: 1em;
  background-color: ${color.whiteColor};
`;
export const PropDownTitle = styled.h2`
  font-size: 1.5em;
`;
export const PropDownListItemWrapper = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  gap: 1em;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 23em;
  height: 23em;
  overflow-y: scroll;
`;
export const PropDownItemWrapper = styled.li`
  gap: 0.5em;
  display: flex;
  padding: 0.3em;
  width: 100%;
  border-radius: 0.2em;
  border: 1px solid ${color.orange};
  position: relative;
`;
export const RemoveButton = styled.button`
  position: absolute;
  right: 0.1em;
  top: 0.1em;
  padding: 0.2em 0.3em;
  border: none;
  font-size: 1em;
  color: ${color.backgroundItemColor};
  background-color: transparent;
  :hover {
    color: ${color.orange};
  }
`;
export const ItemImg = styled.img`
  height: 4em;
  width: 7em;
  object-fit: contain;
`;
export const ItemDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
export const ItemDetailName = styled.p`
  color: #000;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  height: 2em;
  line-height: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  opacity: 1;
  -webkit-transition: ease 0.25s;
  transition: ease 0.25s;
  font-size: 0.8em;
`;
export const ItemDetailQuantity = styled.p`
  font-size: 0.9em;
`;
export const QuantityWrapper = styled.div`
  display: flex;
`;
export const QuantityButton = styled.button`
  display: flex;
  padding: 0.2em 0.3em;
  border: none;
  font-size: 0.8em;
  background-color: transparent;
  color: #000;
  :hover {
    color: ${color.orange};
  }
`;
export const ItemDetailPrice = styled.p`
  font-size: 0.9em;
  color: ${color.orange};
`;
export const ItemFooter = styled.div`
  width: 100%;
  padding-top: 1em;
  display: flex;
  justify-content: space-between;
`;
export const ItemFooterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.2em;
`;
export const ItemFooterTitle = styled.h2`
  font-size: 1.2em;
`;
export const ItemFooterContent = styled.h2`
  font-size: 1.2em;
  color: ${color.orange};
`;
export const ItemFooterButton = styled.button`
  font-size: 1em;
  padding: 0.3em 0.5em;
  font-weight: bold;
  color: #000;
  background-color: ${color.whiteColor};
  border: 1px solid #000;
  transition: 0.25s ease;
  border-radius: 0.5em;
  &:hover {
    color: ${color.whiteColor};
    background-color: #000;
  }
`;
