"use client";

import { useEffect } from "react";
import { fetchTodos } from "@/store/todos/todoThunks";
import { setSkip } from "@/store/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addTodo } from "@/store/todos/todoThunks";
import { useState } from "react";
import { AddTodoModal } from "@/components/ui/AddTodoModal";
import { Button } from "@/components/ui/button";
import { UpdateTodoDrawer } from "@/components/UpdateTodoDrawer";
import { Todo } from "@/store/todos/todoTypes";
import { DeleteTodoDialog } from "@/components/DeleteTodoDialog";
import { Loader2 } from "lucide-react";



export default function HomePage() {
  const dispatch = useAppDispatch();
  const { todos, loading, error, skip, limit, total } = useAppSelector(
    (state) => state.todos
  );
  const [newTodo, setNewTodo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);



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

  return (
    //frosted container
    <main className="p-6 md:my-4  max-w-4xl mx-auto  backdrop-blur-md bg-white/30 md:rounded-lg">
      <h1 className="text-3xl text-[#081d2e] text-center font-bold mb-4">NEXT TODO LIST</h1>

<div className="flex items-center gap-3 justify-between mb-6">
  <div>
    <p className="text-[#ddeffe] ">
      From Plan to Done. Conquer Your Calendar. Tasks Simplified, Focus Maximized.
    </p>
  </div>

  <Button onClick={() => setModalOpen(true)}>
    + Add Todo
  </Button>
</div>

      
      <AddTodoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />



      {loading && (
  <div className="flex h-screen flex-col items-center justify-center py-16 gap-2">
    <Loader2 className="h-15 w-15 animate-spin text-[#bdc1ed]" />
    <span className="text-xl text-[#d5d7f2]">
      Loading todos...
    </span>
  </div>
)}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <table className="w-full overflow-x-auto">
            <thead>
              <tr className="bg-[#b4b9ef] text-[#073256]">
                <th className="border p-2">ID</th>
                {/* <th className="border p-2">ID</th> */}
                <th className="border p-2">Todo</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td className="border p-2 text-center">{todo.id}</td>
                  {/* <td className="border p-2 text-center">{todo.userId}</td> */}
                  <td className="border p-2 text-center font-medium">{todo.todo}</td>
                  <td className="border p-2 text-center">
                      <span
                        className={`px-2 py-1  rounded text-sm ${
                          todo.completed
                            ? "bg-green-200 text-green-700"
                            : "bg-red-300 text-red-800"
                        }`}
                      >
                        {todo.completed ? "Completed" : "Pending"}
                      </span>
                  </td>
                <td className="border p-2 align-middle">
  <div className="flex flex-col gap-2">
    <Button
      size="sm"
      onClick={() => {
        setSelectedTodo(todo);
        setDrawerOpen(true);
      }}
    >
      Edit
    </Button>

    <Button
      size="sm"
      variant="destructive"
      onClick={() => {
        setDeleteOpen(true);
        setDeleteTodoId(todo.id);
      }}
    >
      Delete
    </Button>
  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>

         <div className="flex items-center justify-between mt-6">
           <Button
             variant="page"
             size="sm"
             onClick={handlePrev}
             disabled={skip === 0}
           >
             Previous
           </Button>
         
           <span className="text-sm text-[#7f86d2] font-medium">
             Page {Math.floor(skip / limit) + 1} of {Math.ceil(total / limit)}
           </span>
           <Button
             className="bg-[#9fa5e5] text-[#0a3d67] hover:bg-[#7f86d2] transform-3d duration-300 hover:scale-115"
             size="sm"
             onClick={handleNext}
             disabled={skip + limit >= total}
           >
             Next
           </Button>
         </div>


         <UpdateTodoDrawer
           open={drawerOpen}
           todo={selectedTodo}
           onClose={() => {
             setDrawerOpen(false);
             setSelectedTodo(null);
          }}
          />
          <DeleteTodoDialog
            open={deleteOpen}
            todoId={deleteTodoId}
            onClose={() => {
              setDeleteOpen(false);
              setDeleteTodoId(null);
            }}
          />



        </>
      )}
    </main>
  );
}
