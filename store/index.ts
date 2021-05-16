import { createStore } from "easy-peasy";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  ucid: string;
}

export interface Vendor {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface StoreModel {
  user: User;
  vendors: Vendor[];
}

export const userModel: User = {
  id: 0,
  name: "",
  email: "",
  password: "",
  ucid: "",
};

export const storeModel: StoreModel = {
  user: userModel,
  vendors: [],
};

export const store = createStore(storeModel);
