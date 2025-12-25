"use client";

import { useEffect } from "react";
import { fetchTodos } from "@/store/todos/todoThunks";
import { setSkip } from "@/store/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addTodo } from "@/store/todos/todoThunks";
import { useState } from "react";
import { AddTodoModal } from "@/components/ui/AddTodoModal";
import { Button } from "@/components/ui/button";


export default function HomePage() {
  const dispatch = useAppDispatch();
  const { todos, loading, error, skip, limit, total } = useAppSelector(
    (state) => state.todos
  );
  const [newTodo, setNewTodo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchTodos({ skip, limit }));
  }, [dispatch, skip, limit]);

  const handleNext = () => {
    if (skip + limit < total) {
      dispatch(setSkip(skip + limit));
    }
  };

  const handlePrev = () => {
    if (skip > 0) {
      dispatch(setSkip(skip - limit));
    }
  };
//   const handleAddTodo = () => {
//   if (!newTodo.trim()) return;

//   dispatch(addTodo({ todo: newTodo }));
//   setNewTodo("");
// };


  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="flex justify-end mb-4">
        <Button onClick={() => setModalOpen(true)}>
          + Add Todo
        </Button>
      </div>
      
      <AddTodoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />



      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Todo</th>
                <th className="border p-2">Completed</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td className="border p-2">{todo.id}</td>
                  <td className="border p-2">{todo.todo}</td>
                  <td className="border p-2">
                    {todo.completed ? "✅" : "❌"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={skip === 0}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {Math.floor(skip / limit) + 1} of{" "}
              {Math.ceil(total / limit)}
            </span>

            <button
              onClick={handleNext}
              disabled={skip + limit >= total}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}
