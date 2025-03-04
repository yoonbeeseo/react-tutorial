import { useContext, createContext } from "react";

export interface Context {
  user: null | { email: string; uid: string };
  login: (
    email: string,
    password: string
  ) => { email: string; uid: string } | string;
  logout: () => void;
}

export const initialState: Context = {
  login: () => "",
  logout: () => {},
  user: null,
};

export const context = createContext(initialState);

export const use = () => useContext(context);
