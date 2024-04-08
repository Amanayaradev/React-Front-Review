import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todo, addTodo, todosApi, updateTodo } from "../services/todosApi";
import Context from "./Context";

type ProviderProps = {
    children: React.ReactNode
}

export type ProviderValues = {
    onLogin: (email: string) => void,
    getTodos: () => Promise<void>,
    editTodos: (todoData: Todo) => Promise<void>,
    addTodos: (todo: string) => Promise<void>,
    todos: Todo[],
    user: string,
    loading: boolean
}

function Provider({ children }: ProviderProps) {

    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState([] as Todo[]);

    const onLogin = useCallback((email: string) => {
        console.log("chamei o onLogin");
        setUser(email);
        navigate("/todo");
    }, [setUser, navigate]);

    const getTodos = async () => {
        setLoading(true);
        try {
            const result = await todosApi();
            setTodos(result);
        } catch (error) {
            throw new Error("Erro ao buscar tarefas");
        } finally {
            setLoading(false);
        }
    }

    const editTodos = useCallback(async (todoData: Todo) => {
      setLoading(true);
      try {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === todoData.id) {
            return { ...todo, checked: todoData.checked };
          }
          return todo;
        });
        setTodos(updatedTodos);
        await updateTodo(todoData);
      } catch (error) {
        throw new Error("erro ao editar task");
      } finally {
        setLoading(false);
      }
    }, [todos]);
  
    const addTodos = useCallback(async (todo: string) => {
      try {
        const response = await addTodo(todo);
        setTodos((prevTodos) => [...prevTodos, response]);
      } catch (error) {
        throw new Error("erro ao adicionar task");
      }
    }, []);


    const values: ProviderValues = useMemo(() => ({
      onLogin,
      todos,
      user,
      getTodos,
      loading,
      editTodos,
      addTodos,
  }), [onLogin, todos, user, loading, editTodos, addTodos]);
  

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>);
}

export default Provider;