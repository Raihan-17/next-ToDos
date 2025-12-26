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
  DrawerDescription
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

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
        todo: text.trim(),
        completed: completed,
      })
    );
      toast.success("Todo updated", {
        description: "The todo was updated successfully.",
      });

    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle>Edit Todo</DrawerTitle>
          <DrawerDescription>
            Update the details of the todo item.
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-4">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Todo text"
          />

          <div className="flex items-center gap-2">
            <Checkbox className="border-2 border-[#595c7d]"
              checked={completed}
              onCheckedChange={(value) =>{
                if(value === "indeterminate") return;
                setCompleted(value);
              }}
            />
            <span>Completed</span>
          </div>
        </div>

        <DrawerFooter className="mt-4">

            <Button onClick={handleUpdate}>Update</Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
