import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Todo } from "./todoTypes";

interface FetchTodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchTodos = createAsyncThunk<
  FetchTodosResponse,
  { skip: number; limit: number },
  { rejectValue: string }
>("todos/fetchTodos", async ({ skip, limit }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
    );

    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to fetch todos");
  }
});

export const addTodo = createAsyncThunk<
  Todo,
  { todo: string; userId: number },
  { rejectValue: string }
>("todos/addTodo", async ({ todo, userId }, { rejectWithValue }) => {
  try {
    const response = await axios.post("https://dummyjson.com/todos/add", {
      todo,
      completed: false,
      userId,
    });

    return response.data;
  } catch (error) {
    return rejectWithValue("Failed to add todo");
  }
});

