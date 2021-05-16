import { action, Action, createStore, thunk } from "easy-peasy";
import { Thunk } from "graphql";

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
  setVendors: Action<StoreModel, Vendor[]>;
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
  setVendors: action((state, payload) => {
    state.vendors = payload;
  }),
};

export const store = createStore(storeModel);
