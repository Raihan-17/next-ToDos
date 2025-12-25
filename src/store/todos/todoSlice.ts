import { createSlice } from "@reduxjs/toolkit";
import { TodoState } from "@/store/todos/todoTypes";

const initialState: TodoState = {
  todos: [],
  total: 0,
  limit: 10,
  skip: 0,
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
});

export default todoSlice.reducer;
