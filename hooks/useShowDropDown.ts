import { selectDropdownList, setShowCart, setUserMenu } from "@/features/dropDownSlice";
import { useDispatch, useSelector } from "react-redux";

const useShowDropDown = () => {
  const {isShowCart, isShowUserMenu } = useSelector(selectDropdownList);
  const dispatch = useDispatch()
  const handleShowUserMenu = () => {
    dispatch(setUserMenu())
  }
  const handleShowCart = () => {
    dispatch(setShowCart())
  }
  return {
    isShowCart,
    isShowUserMenu,
    handleShowUserMenu,
    handleShowCart,
  }
}
export default useShowDropDown;
