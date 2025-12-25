import { createSlice } from "@reduxjs/toolkit";
import { TodoState } from "./todoTypes";
import { fetchTodos , addTodo, updateTodo} from "./todoThunks";

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
      })

      // Adding TODO
      .addCase(addTodo.pending, (state) => {
  state.loading = true;
})
.addCase(addTodo.fulfilled, (state, action) => {
  state.loading = false;

  // Add new todo at the top
  state.todos.unshift(action.payload);
  // remove the last one,if exceeds limit
  if (state.todos.length > state.limit) {
    state.todos.pop();
  }

  state.total += 1;
})
.addCase(addTodo.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || "Failed to add todo";
})

// Updating TODO
.addCase(updateTodo.pending, (state) => {
  state.loading = true;
})
.addCase(updateTodo.fulfilled, (state, action) => {
  state.loading = false;

  const index = state.todos.findIndex(
    (todo) => todo.id === action.payload.id
  );

  if (index !== -1) {
    state.todos[index] = action.payload;
  }
})
.addCase(updateTodo.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || "Failed to update todo";
});


  },
});

export const { setSkip } = todoSlice.actions;
export default todoSlice.reducer;
