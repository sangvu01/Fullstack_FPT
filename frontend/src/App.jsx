import { useState } from 'react';
import { useEffect } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const BE_URL = "http://localhost:5000/todos"




  useEffect(() => {
    fetchTodos();
  }, []);


  const addTodo = async () => {

    if (!input.trim()) return;

    try{
      await fetch(BE_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          text: input
        })
      });

      setInput("");

      fetchTodos();
    }
    catch(err){
      console.log(err)
    }
  }



  const fetchTodos = async () => {
    try{
      const response = await fetch(BE_URL)

      const data = await response.json();

      setTodos(data);
    }
    catch(err){
      console.log(err);
    }
  }


  const deleteTask = async (_id) =>{
    try{
      // await fetch(BE_URL + '/' + _id, {
      await fetch(`${BE_URL}/${_id}`, {
        method: "DELETE"
      })

      fetchTodos();
    }

    catch(err){
      console.log(err)
    }
  }



  return (
  <div className="app">

    <h1>Sangvu - TodoList</h1>

    <div className="input-group">
      <input
        type='text'
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder='Enter new task...'
      />

      <button onClick={addTodo}>Add</button>
    </div>

    <div className="todo-list">
      {
        todos.map((todo) => (
          <div className="todo-item" key={todo._id}>
            <p>{todo.text}</p>

            <button onClick={() => deleteTask(todo._id)}>
              DELETE
            </button>
          </div>
        ))
      }
    </div>

  </div>
)
}

export default App
