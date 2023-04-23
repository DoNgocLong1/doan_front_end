export interface Iuser {
  email: string,
  firstname?: string,
  lastname?: string,
  roleId: string,
}
export interface ICategory {
  name: string,
  image: string,
}
export interface IUserData {
  fullName: string,
  email: string,
  address?: string,
  phoneNumber?: number,
  date?: string,
  avatar?: string,
}

export interface IUserCreateData {
  fullName: string,
  email: string,
  password: string,
  address?: string,
  phoneNumber?: number,
  date?: string,
  roleId: number,
  avatar?: string,
}

export type postOrderType = {
  fullName: string,
  amount: number,
  orderList: string,
  phoneNumber: number,
  note?: string,
}
