export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TodoState {
  todos: Todo[];
  total: number;
  limit: number;
  skip: number;
  loading: boolean;
  error: string | null;
}
