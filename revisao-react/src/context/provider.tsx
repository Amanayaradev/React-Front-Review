import { useCallback, useMemo, useState } from "react";
import { Todo, todosApi, updateTodo } from "../services/todosApi";
import Context from "./Context";

type ProviderProps = {
  children: React.ReactNode;
};

export type ProviderValues = {
  onLogin: (email: string) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  getTodos: () => Promise<void>;
  editTodo: (todoData: Todo) => Promise<void>;
  user: string;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

function Provider({ children }: ProviderProps) {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([] as Todo[]);

  const onLogin = useCallback((email: string) => {
    setUser(email);
  }, []);

  const getTodos = async () => {
    setIsLoading(true);
    try {
      const allTodosApi = await todosApi();
      setTodos(allTodosApi);
    } catch (error) {
      throw new Error("erro na busca de todos");
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const editTodo = async (todoData: Todo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoData.id) {
        todo.checked = !todoData.checked;
      }
      return todo;
    });
    setIsLoading(true);
    setTodos(updatedTodos);
    setIsLoading(false);
    await updateTodo(todoData);
  };

  const values: ProviderValues = useMemo(
    () => ({
      onLogin,
      user,
      isLoading,
      setIsLoading,
      todos,
      editTodo,
      getTodos,
      setTodos,
    }),
    [editTodo, isLoading, onLogin, todos, user]
  );

  return <Context.Provider value={values}>{children}</Context.Provider>;
}

export default Provider;
