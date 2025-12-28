
"use client";

import { useGetTodosQuery } from "@/store/api/todoApi";
import { useState } from "react";
import { AddTodoModal } from "@/components/ui/AddTodoModal";
import { Button } from "@/components/ui/button";
import { UpdateTodoDrawer } from "@/components/UpdateTodoDrawer";
import { Todo } from "@/store/todos/todoTypes";
import { DeleteTodoDialog } from "@/components/DeleteTodoDialog";
import { Loader2 } from "lucide-react";
import { TodoCard } from "@/components/TodoCard";
import { motion } from "framer-motion";

export default function HomePage() {

  const [skip, setSkip] = useState(0);
  const limit = 10;
  const {data,isLoading,error}=useGetTodosQuery({skip,limit});

  const todos= data?.todos??[];
  const total= data?.total??[];
  
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);


const handleNext = () => {
  if (skip + limit < total) {
      setSkip((prev) => prev + limit);
  }
};

const handlePrev = () => {
  if (skip > 0) {
    setSkip((prev) => prev - limit);
  }
};

  return (
    
 <main className="min-h-screen flex items-center justify-center px-4">
  <section className="w-full py-6 max-w-6xl shadow-xl">

    <h1 className="text-4xl font-bold text-center  bg-clip-text text-transparent mb-2">
      NEXT TODO LIST
    </h1>

    <p className="text-center text-white text-lg mb-6">
      From Plan to Done. Conquer Your Calendar.
    </p>

    {/* Controls */}
    <div className="flex items-center justify-between mb-6 gap-3">
      <Button
        className=""
        onClick={() => setShowTable((prev) => !prev)}
      >
        {showTable ? "Card View" : "All Tasks"}
      </Button>

      <Button variant="main" onClick={() => setModalOpen(true)}>
        + Add Todo
      </Button>
    </div>

    <AddTodoModal open={modalOpen} onClose={() => setModalOpen(false)} />

    {/* Loading */}
    {isLoading && (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="h-12 w-12 animate-spin text-fuchsia-500" />
        <span className="text-lg text-violet-200">Loading todos...</span>
      </div>
    )}

    {/* ERROR */}
    {error && <p className="text-red-500 text-4xl text-center">Failed to load todos</p>}

    {!isLoading && !error && !showTable && (
<div className="relative">
  
  <div className="
      flex gap-6 overflow-x-auto pb-4
      snap-x snap-mandatory
      scrollbar-thin scrollbar-thumb-violet-400
    "
  >
    {todos.map((todo, index) => (
      <motion.div
        key={todo.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="
          snap-start
          min-w-[260px]
          sm:min-w-[280px]
          md:min-w-[300px]
        "
      >
        <TodoCard
          todo={todo}
          index={index}
          onEdit={() => {
            setSelectedTodo(todo);
            setDrawerOpen(true);
          }}
          onDelete={() => {
            setDeleteTodoId(todo.id);
            setDeleteOpen(true);
          }}
        />
      </motion.div>
    ))}
  </div>
</div>

    )}

    {!isLoading && !error && showTable && (
      <>
        <div className="overflow-x-auto">
          <table className="w-full bg-purple-100 rounded-lg overflow-hidden">
            <thead className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-fuchsia-700 text-white">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Todo</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id} className="border-t border-purple-300">
                  <td className="p-2 text-center">{todo.id}</td>
                  <td className="p-2 text-center">{todo.todo}</td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        todo.completed
                          ? "bg-green-200 text-green-900"
                          : "bg-yellow-200 text-yellow-900"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Pending"}
                    </span>
                  </td>
            <td className="p-2">
              <div className="flex flex-col gap-2">
                <Button
                  size="sm"
                  variant="mainOut"
                  onClick={() => {
                    setSelectedTodo(todo);
                    setDrawerOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="main-2"
                  onClick={() => {
                    setDeleteTodoId(todo.id);
                    setDeleteOpen(true);
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
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="page"
            size="sm"
            onClick={handlePrev}
            disabled={skip === 0}
          >
            Previous
          </Button>

          <span className="text-sm text-violet-300">
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
      </>
    )}

    {/* Drawers & Dialogs */}
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
  </section>
</main>

  );
}

