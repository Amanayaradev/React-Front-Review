import { ChangeEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { ProviderValues } from '../context/provider';


function Login(){

    const [fields, setFields] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const contextValues = useContext(Context) as ProviderValues;

    const {onLogin} = contextValues;


    const handleChange = ({ target } : ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields, [target.name]: target.value
        });
    }

    const handleSubmit = (event: { preventDefault: () => void; } ) => {
        event.preventDefault()
        console.log(fields.email);
        onLogin(fields.email);
        navigate("/todo");
    }

    return(
        <>
        <h1>Pag de Login</h1>

        <form onSubmit={handleSubmit}>
            <p><input type="email" onChange={handleChange} name='email'  placeholder='email' /></p>
            <p><input type="password" onChange={handleChange} name='password' placeholder='password' /></p>
            <button>Entrar</button>
        </form>
        </>
    );
}

export default Login;