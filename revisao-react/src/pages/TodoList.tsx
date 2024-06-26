import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { ProviderValues } from '../context/provider';
import { Todo } from '../services/todosApi';

function TodoList(){

    const contextValues = useContext(Context) as ProviderValues;

    const { user, loading, todos, getTodos, editTodos } = contextValues;


    const navigate = useNavigate();

    useEffect(() => {
        if(!todos.length) getTodos();
    }, [getTodos, todos.length]);
    
    const handleCheck = (todoData: Todo) => {
        console.log("check", !todoData.checked, todos)
        editTodos({...todoData, checked: !todoData.checked});
    }
    

    return(
        <>
        <h1>Welcome, {user}</h1>
        <button onClick={()=>navigate("/todo/add")}> Add new Task</button>
            <ul>
            {
                loading ? <p>Loading...</p> 
                : todos.map((todo) => {
                    return <li key={todo.id}>
                        <input type="checkbox" onChange={() => handleCheck(todo)} checked={todo.checked} value={todo.value}/>
                        {todo.value}
                        </li>
                })
            }
            </ul>
        </>
    );
}

export default TodoList;