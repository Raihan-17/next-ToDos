"use client";

import { useAppDispatch } from "@/store/hooks";
import { deleteTodo } from "@/store/todos/todoThunks";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteTodoDialogProps {
  open: boolean;
  onClose: () => void;
  todoId: number | null;
}

export function DeleteTodoDialog({
  open,
  onClose,
  todoId,
}: DeleteTodoDialogProps) {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (!todoId) return;

    await dispatch(deleteTodo({ id: todoId }));

    toast.success("Todo deleted", {
      description: "The todo was removed successfully.",
    });

    onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-violet-950 font-bold">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-violet-700">
            This action cannot be undone. This will permanently
            delete the selected todo.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-2 border-purple-800 bg-clip-text text-transparent bg-gradient-to-br from-purple-800 to-fuchsia-700 shadow-lg hover:border-fuchsia-400 duration-300 hover:scale-105">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-gradient-to-br from-violet-600 to-fuchsia-800 text-white hover:bg-fuchsia-400 duration-300 transition-3d hover:scale-105">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
