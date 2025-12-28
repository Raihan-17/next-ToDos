"use client";

import { useState, useEffect } from "react";
import { Todo } from "@/store/todos/todoTypes";
import { useAppDispatch } from "@/store/hooks";
import { useUpdateTodoMutation } from "@/store/api/todoApi";

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
  const [updateTodo , { isLoading }] = useUpdateTodoMutation();

  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setText(todo.todo);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const handleUpdate = async () => {
    if (!todo) return;

    try {
      await updateTodo({
        id: todo.id,
        todo: text.trim(),
        completed: completed,
      });
      toast.success("Todo updated", {
        description: "The todo was updated successfully.",
      });
    } catch (error) {
      toast.error("Failed to update todo", {
        description: "There was an error updating the todo.",
      });
    }

    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="p-4">
        <DrawerHeader>
          <DrawerTitle className="text-violet-950 font-bold">Edit Todo</DrawerTitle>
          <DrawerDescription className="text-violet-900">
            Update the details of the todo item.
          </DrawerDescription>
        </DrawerHeader>

        <div className="space-y-4 ">
          <Input className="border border-purple-800 text-violet-950"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Todo text"
          />

          <div className="flex items-center gap-2">
            <Checkbox className="border-2 border-purple-800"
              checked={completed}
              onCheckedChange={(value) =>{
                if(value === "indeterminate") return;
                setCompleted(value);
              }}
            />
            <span className=" text-violet-900">Completed</span>
          </div>
        </div>

        <DrawerFooter className="mt-4">

            <Button variant="main" onClick={handleUpdate}>Update</Button>
          <Button variant="mainOut" onClick={onClose}>
            Cancel
          </Button>
          
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
