import { useState } from 'react';
import { useEffect } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try{
      const response = await fetch("http://localhost:5000/todos")

      const data = await response.json();

      setTodos(data);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div>
        Sangvu - TodoList
      </div>

      {
        todos.map((todo) => (
          <div key={todo._id}>
            <p>{todo.text}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
