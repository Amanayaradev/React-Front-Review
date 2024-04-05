import axios from 'axios';

const baseURL = 'http://localhost:4000';

export type Todo = {
    id: string,
    value: string,
    checked: boolean
};

export async function todosApi(): Promise<Todo[]> {
    try {
        const response = await axios.get<Todo[]>(`${baseURL}/todos`);
        return response.data;
    } catch (error) {
        console.error(error);
        alert('Serviço indisponível');
        return [];
    }
}

export async function addTodo(todo: string) {
    try {
        const response = await axios.post<Todo>(`${baseURL}/todos`, {
            value: todo,
            checked: false,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        alert('Erro ao adicionar tarefa');
        throw error;
    }
}

export async function updateTodo(todo: Todo) {
    try {
        const response = await axios.put<Todo>(`${baseURL}/todos/${todo.id}`, todo);
        return response.data;
    } catch (error) {
        console.error(error);
        alert('Erro ao atualizar tarefa');
        throw error;
    }
}
