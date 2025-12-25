import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "@/store/todos/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
