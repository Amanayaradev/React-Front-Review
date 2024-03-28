import { Route, Routes } from 'react-router-dom'
import './App.css'
import AddTodo from './pages/AddTodo'
import Login from './pages/Login'
import TodoList from './pages/TodoList'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/todo" element={<TodoList />} />
        <Route path="/addtodo" element={<AddTodo />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </main>
  )
}

export default App
