export type imageType = string[];
export interface IImage {
  image: string,
}
export interface IProductAddItem {
  categoryId: any,
  name: string,
  brand: string,
  rate: number,
  price: number,
  description: string,
  parameter: string,
  quantityInStock: number,
  discount: number
  sold: number,
}
export interface IProductItem {
  id: string,
  categoryId: any,
  name: string,
  brand: string,
  rate: number,
  price: number,
  description: string,
  parameter: string,
  quantityInStock: number;
  discount: number
  sold: number,
}
export interface IImageProduct {
  image?: string,
}
export interface IProductItemData {
  id: string,
  categoryId: any,
  name: string,
  brand: string,
  rate: number,
  price: number,
  description: string,
  parameter: string,
  quantityInStock: number;
  discount: number
  sold: number,
  Image_Products?: IImageProduct,
}
export interface IdataCategory {
  id: number,
  name: string,
  image: string;
}
export interface IProductImage {
  id?: number,
  productId: number,
  image: string,
}
