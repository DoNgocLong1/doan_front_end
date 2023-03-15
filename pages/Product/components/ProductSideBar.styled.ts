import color from "@/utils/color";
import styled from "styled-components";
import breakPoints from "@/constants/breakpoint";
export const SideBar = styled.div`
  background-color: ${color.backgroundItemColor};
  height: fit-content;
  .ant-menu {
    background-color: ${color.backgroundItemColor};
    color: ${color.whiteColor};
    .ant-menu-submenu-active {
      background-color: ${color.whiteColor};
      color: #000;
    }
  }
  @media ${breakPoints.mobile} {
    height: 80%;
    overflow-y: scroll;
  }
`;
export const SideBarToggle = styled.button`
  display: none;
  @media ${breakPoints.mobile} {
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    transform: translateX(100%);
    z-index: 90;
    padding: 0.2em;
    font-size: 3em;
    color: ${color.whiteColor};
    background-color: #000;
    border: none;
  }
`;
export const Title = styled.h1`
  font-size: 2em;
  padding: 1em 0;
  border-bottom: 1px solid ${color.orange};
`;
export const CategoriesContainer = styled.ul`
  padding: 1em;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1em;
`;
export const CategoryImgWarper = styled.div`
  min-width: 5em;
`;
export const CategoryIconWarper = styled.div`
  font-size: 2em;
`;
export const CategoryImg = styled.img`
  height: 100%;
`;
export const CategoryName = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.5em;
  color: ${color.whiteColor};
  flex: 3;
  @media ${breakPoints.mobile} {
    font-size: 1.3em;
  }
`;
export const CategoryWrapper = styled.li`
  cursor: pointer;
  padding: 1em;
  height: 5em;
  display: flex;
  justify-content: flex-start;
  gap: 1em;
  border: 1px solid ${color.whiteColor};
  border-radius: 1em;
  transition: 0.25s ease;
  &:hover {
    background-color: ${color.whiteColor};
    ${CategoryName} {
      font-weight: bold;
      color: #000;
    }
  }
`;
export const CategoryWrapperActive = styled(CategoryWrapper)`
  background-color: ${color.whiteColor};
  font-weight: bold;
  color: #000;
  ${CategoryName} {
    font-weight: bold;
    color: #000;
  }
`;
export const SideBarButton = styled.span`
  color: ${color.orange};
  font-size: 1em;
`;
