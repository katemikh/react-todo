import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [newTodo, setNewTodo] = useState("");

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Todo List</h1>
      <AddTodoForm  onAddTodo={(todoTitle) => setNewTodo(todoTitle)}/>
      <p>New Todo: {newTodo}</p> {/* Display the value of newTodo variable */}
      <TodoList />
    </div>
  );
}

export default App;