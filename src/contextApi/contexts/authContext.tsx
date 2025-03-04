import { useContext, createContext } from "react";

export interface Context {
  user: User | null;
  initialized: boolean;

  login: (email: string, password: string) => void | string;

  logout: () => void;
}

export interface User {
  email: string;
  uid: string;
}
export interface LoginProps {
  email: string;
  password: string;
}

export interface StoredUser extends User {
  password: string;
}

export const initialState: Context = {
  initialized: false,
  login: () => "",
  logout: () => ({}),
  user: null,
};

export const context = createContext(initialState);

export const use = () => useContext(context);
