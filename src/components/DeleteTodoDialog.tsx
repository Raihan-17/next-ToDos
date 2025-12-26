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
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently
            delete the selected todo.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
