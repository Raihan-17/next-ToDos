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

 function tableHead() {
  return "border border-purple-400 p-2";
}

function tableCell() {
  return "border border-purple-400 p-2 text-center";
}

  return (
    //frosted container 39315a
  <main className="p-6 md:my-4 md:max-w-4xl mx-auto  bg-[#0f0c17] md:rounded-lg">
      <h1 className="text-4xl bg-gradient-to-r from-fuchsia-400 to-violet-800 bg-clip-text text-transparent text-center font-bold mb-4">
  NEXT TODO LIST
</h1>


<div className="flex items-center gap-3 justify-between mb-6">
  <div>
    <p className="text-violet-300 font-medium">
      From Plan to Done. Conquer Your Calendar. Tasks Simplified, Focus Maximized.
    </p>
  </div>

  <Button
    variant={"main"}
    onClick={() => setModalOpen(true)}
  >
    + Add Todo
  </Button>
</div>

      
      <AddTodoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />



      {loading && (
  <div className="flex h-screen flex-col items-center justify-center py-16 gap-2">
    <Loader2 className="h-15 w-15 animate-spin text-purple-600" />
    <span className="text-xl text-fuchsia-700 font-medium">
      Loading todos...
    </span>
  </div>
)}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <table className="w-full bg-purple-200 overflow-x-auto">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-fuchsia-700 text-[#073256]">
                <th className={tableHead()}>ID</th>
                {/* <th className="border d:flex p-2">User ID</th> */}
                <th className={tableHead()}>Todo</th>
                <th className={tableHead()}>Status</th>
                <th className={tableHead()}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td className={tableCell()}>{todo.id}</td>
                  
                  {/* <td className=" border  hidden md:flex p-2 text-center">{todo.userId}</td> */}
                  <td className={tableCell()}>{todo.todo}</td>
                  <td className={tableCell()}>
                      <span
                        className={`px-2 py-1  rounded text-sm ${
                          todo.completed
                            ? "bg-green-300 shadow-md text-green-900"
                            : "bg-yellow-300 shadow-md text-yellow-900"
                        }`}
                      >
                        {todo.completed ? "Completed" : "Pending"}
                      </span>
                  </td>
                <td className="border border-purple-400 p-2 align-middle">
  <div className="flex flex-col gap-2">
    <Button
      variant={"main-2"}
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
      variant="mainOut"
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
             variant="page"
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
