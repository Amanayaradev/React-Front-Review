import axios from 'axios';

const baseURL = 'http://localhost:3000'; // URL base da API

export type Todo = {
  id: number;
  value: string;
  checked: boolean;
};

// Função para obter a lista de todos os todos da API
export async function todosApi(): Promise<Todo[]> {
  try {
    const response = await axios.get<Todo[]>(`${baseURL}/todos`);
    return response.data;
  } catch (error) {
    // Se houver um erro, alerta o usuário sobre o serviço indisponível
    alert('Serviço indisponível');
    return []; // Retorna uma lista vazia em caso de erro
  }
}

// Função para adicionar um novo todo na API
export async function addTodo(todo: Todo) {
  const response = await axios.post<Todo>(`${baseURL}/todos`, todo, { 
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data; // Retorna os dados JSON da resposta da API
}

// Função para atualizar um todo existente na API
export async function updateTodo(todo: Todo) {
  const response = await axios.put<Todo>(`${baseURL}/todos/${todo.id}`, todo, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data; // Retorna os dados JSON da resposta da API
}
