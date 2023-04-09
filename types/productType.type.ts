export type imageType = string[];
export interface IImage {
  image: string,
}
export interface IProductItem {
  id: string;
  Image_Products: IImage;
  name: string;
  brand: string;
  rate: number;
  price: number;
  description: string,
  parameter: string,
  quantityInStock: number;
  discount: number
  sold: number,
}
export interface IdataCategory {
  id: number;
  name: string;
  image: string;
}
