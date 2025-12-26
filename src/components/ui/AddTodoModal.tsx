"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addTodo } from "@/store/todos/todoThunks";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddTodoModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddTodoModal({ open, onClose }: AddTodoModalProps) {
  const dispatch = useAppDispatch();

  const [todo, setTodo] = useState("");
  const [userId, setUserId] = useState("1");

  const handleSubmit = () => {
    if (!todo.trim()) return;

    dispatch(
      addTodo({
        todo,
        userId: Number(userId),
      })
    );

    setTodo("");
    setUserId("1");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogHeader>
  <DialogTitle>Add New Todo</DialogTitle>
  <DialogDescription>
    Enter todo details and assign a user.
  </DialogDescription>
</DialogHeader>

        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Todo description"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />

          <Input
            type="number"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Todo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
