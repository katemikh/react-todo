import { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState([]); // Adding a state variable todoList

   const addTodo = (newTodo) => {
     setTodoList((prevTodoList) => [...prevTodoList, newTodo]); // Adding a new todo to the todoList
   };
   
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} todoList={todoList} />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;