import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../todos/todoTypes";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    //  Fetch Todos
    getTodos: builder.query<
      { todos: Todo[]; total: number },
      { limit: number; skip: number }>({
      query: ({ limit, skip }) => `todos?limit=${limit}&skip=${skip}`,
      providesTags: ["Todos"],
    }),

    // Add 
    addTodo: builder.mutation({
      query: (body) => ({
        url: "todos/add",
        method: "POST",
        body,
      }),
      async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
       const patchResult = dispatch(
      todoApi.util.updateQueryData(
        "getTodos",
        { skip: 0, limit: 10 },
        (draft: any) => {
          draft.todos.unshift({
            ...newTodo,
            id: Date.now(),
            completed: false,
          });
          draft.total += 1;
        }
      )
      );
      try {
        await queryFulfilled;
      } catch {
        patchResult.undo();
      }
    },
      invalidatesTags: ["Todos"],
    }),

    //  Update 
      updateTodo: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData(
            "getTodos",
            { skip: 0, limit: 10 },
            (draft: any) => {
              const todo = draft.todos.find((t: any) => t.id === id);
              if (todo) Object.assign(todo, patch);
            }
          )
        );
    
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Todos"],
    }),


    //   Delete Todo
      deleteTodo: builder.mutation({
       query: (id: number) => ({
         url: `/todos/${id}`,
         method: "DELETE",
       }),
       async onQueryStarted(id, { dispatch, queryFulfilled }) {
         const patchResult = dispatch(
           todoApi.util.updateQueryData(
             "getTodos",
             { skip: 0, limit: 10 },
             (draft: any) => {
               draft.todos = draft.todos.filter((t: any) => t.id !== id);
               draft.total -= 1;
             }
           )
         );
     
         try {
           await queryFulfilled;
         } catch {
           patchResult.undo();
         }
       },
    //    invalidatesTags: ["Todos"],
     }),

  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
