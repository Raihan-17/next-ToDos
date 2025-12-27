import { Button } from "@/components/ui/button";
import { Todo } from "@/store/todos/todoTypes";

interface Props {
  todo: Todo;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function TodoCard({ todo, index, onEdit, onDelete }: Props) {
  return (
    <div className="
        h-full
        bg-white/80 backdrop-blur
        rounded-xl p-4 shadow-lg
        flex flex-col
      "
    >
    
      <div>
        <p className="text-xs text-gray-500 mb-1">
          #{index + 1}  <span className="font-medium ml-4"> User: {todo.userId} </span>
        </p>

        <p className="font-semibold text-gray-800 leading-snug">
          {todo.todo}
        </p>
      </div>

      <div className="mt-auto pt-4">
        <span
          className={`inline-block mb-3 px-2 py-1 rounded text-xs font-medium ${
            todo.completed
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {todo.completed ? "Completed" : "Pending"}
        </span>

        <div className="flex gap-2">
          <Button size="sm" variant="mainOut" className="flex-1" onClick={onEdit}>
            Edit
          </Button>
          <Button size="sm" variant="main-2" className="flex-1" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
