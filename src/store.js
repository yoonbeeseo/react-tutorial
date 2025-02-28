import { configureStore } from "@reduxjs/toolkit"
import { studentsSlice } from "./studentSlice"

export const store = configureStore({
  reducer: {
    studentsSlice,
  },
})
