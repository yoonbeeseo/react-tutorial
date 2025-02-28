import { useContext, createContext } from "react"

const initialState = {
  조상들: [],
  성씨: "",
  세대: 0,
  본가: "",
  조상추가: () => {},
}

export const 족보 = createContext(initialState)

export const 족보사용 = () => useContext(족보)
