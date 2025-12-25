import { createSlice } from "@reduxjs/toolkit";
import { TodoState } from "./todoTypes";
import { fetchTodos } from "./todoThunks";

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
  reducers: {
    setSkip(state, action) {
      state.skip = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetching TODOS
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setSkip } = todoSlice.actions;
export default todoSlice.reducer;
