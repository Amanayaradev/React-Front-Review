const URL = 'http://localhost:2000';

export type Todo = {
    id: string,
    value: string,
    checked: boolean
};

export async function todosApi(): Promise<Todo[]> {
    try {
        const response = await fetch(`${URL}/todos`);
        return response.json() as Promise<Todo[]>;
    } catch (e) {
        console.log(e);
        alert('Serviço indisponível');
        return [];
    }
}

export async function addTodo(todo: string) {
    const response = await fetch(`${URL}/todos`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            value: todo,
            checked: false,
        }),
    });
    return response.json();
}

export async function updateTodo(todo: Todo) {
    // console.log(todo);
    const response = await fetch(`${URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
    });
    return response.json();
}