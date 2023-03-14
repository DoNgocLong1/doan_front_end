import { addItem, decreaseItem, removeItem } from "features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { selectCartList } from "features/cart/cartSlice";
import { useSelector } from "react-redux";
import { CartItemType } from "types/cartType.type";
const useCart = () => {
  const { cartList, totalPrice, listLength } = useSelector(selectCartList);
  const dispatch = useDispatch();
  const handleAddItem = (payload: any): void => {
    console.log(payload);
    const payloadData: CartItemType = {
      id: payload.id,
      img: payload.img || "",
      name: payload.name,
      price: +payload.price,
    };
    dispatch(addItem(payloadData));
  };
  const handleDecreaseItem = (payload: any): void => {
    console.log(payload);
    const payloadData: CartItemType = {
      id: payload.id,
      img: payload.img || "",
      name: payload.name,
      price: +payload.price,
    };
    dispatch(decreaseItem(payloadData));
  };
  const handleRemove = (payload: any): void => {
    console.log(payload);
    const payloadData: CartItemType = {
      id: payload.id,
      img: payload.img || "",
      name: payload.name,
      price: +payload.price,
    };
    dispatch(removeItem(payloadData));
  };
  let orderList: any = [];
  for (const item of cartList) {
    const params = {
      product_id: item.id,
      quantity: item.count,
    };
    orderList = [...orderList, params];
  }
  return {
    handleAddItem,
    handleDecreaseItem,
    handleRemove,
    cartList,
    orderList,
    totalPrice,
    listLength,
  };
};
export default useCart;
