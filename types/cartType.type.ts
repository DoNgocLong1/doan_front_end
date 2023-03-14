export type CartItemType = {
  id: string;
  img: any;
  name: string;
  price: number;
};
export interface ICartList extends CartItemType {
  count?: number;
  total?: number;
}
