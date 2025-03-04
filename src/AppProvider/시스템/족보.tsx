import { useContext, createContext } from "react";

export interface Context {
  성씨: string;
  조상들: string[];
}

export const initialState: Context = {
  성씨: "",
  조상들: [],
};

export const context = createContext(initialState);

export const use = () => useContext(context);
