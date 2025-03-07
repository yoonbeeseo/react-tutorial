import { useContext, createContext } from "react";

export interface Context {
  init: boolean;
  user: null | User;
  admin: null | Admin;
  isInitialAdmin: boolean;
}

export interface Admin {
  email: string;
  uid: string;
}

export const initialState: Context = {
  admin: null,
  init: false,
  isInitialAdmin: false,
  user: null,
};

export const context = createContext(initialState);

export const use = () => useContext(context);
