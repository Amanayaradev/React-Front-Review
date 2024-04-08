import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { ProviderValues } from '../context/provider';

function AddTodo(){
    const contextValues = useContext(Context) as ProviderValues;

    const { user, addTodos } = contextValues;
    const [task, setTask] = useState("")

    const navigate = useNavigate();

    const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        console.log(target.value)
        setTask(target.value)
    }
    
    const handleSubmit = (event: FormEvent)=> {
        event.preventDefault();
        if (task) {
            addTodos(task)
        }
        navigate("/todo");
    }

    return(
        <>
        <h1>Welcome, {user}</h1>
        <h3>Add new task</h3>
        <form onSubmit={ handleSubmit }>
        <p><input type="text" onChange={handleChange} name='task' placeholder='task' /></p>
        <button>Add to List</button>
        </form>
        </>

    );
}

export default AddTodo;