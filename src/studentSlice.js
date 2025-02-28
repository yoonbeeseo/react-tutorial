import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "students",
  initialState: ["강찬희", "유경환", "강산", "허승이", "김영화"],
  reducers: {
    addStudent: (state) => {
      return [...state, "새로운 학생"]
    },
  },
})

export const studentsSlice = slice.reducer
export const { addStudent } = slice.actions
