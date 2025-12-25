"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/store/todos/todoTypes";
import { useAppDispatch } from "@/store/hooks";
import { updateTodo } from "@/store/todos/todoThunks";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface UpdateTodoDrawerProps {
  open: boolean;
  onClose: () => void;
  todo: Todo | null;
}

export function UpdateTodoDrawer({
  open,
  onClose,
  todo,
}: UpdateTodoDrawerProps) {
  const dispatch = useAppDispatch();

  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setText(todo.todo);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleUpdate = () => {
    if (!todo) return;

    dispatch(
      updateTodo({
        id: todo.id,
        todo: text,
        completed,
      })
    );

    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Edit Todo</DrawerTitle>
        </DrawerHeader>

        <div className="space-y-4">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Todo text"
          />

          <div className="flex items-center gap-2">
            <Checkbox
              checked={completed}
              onCheckedChange={(value) =>
                setCompleted(Boolean(value))
              }
            />
            <span>Completed</span>
          </div>
        </div>

        <DrawerFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
