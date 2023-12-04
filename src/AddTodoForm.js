import React from "react";
// import { useState } from "react";
import InputWithLabel from "./InputWithLabel";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = React.useState(""); // Adding a state variable todoTitle

  function handleTitleChange(e) {
    let newTodoTitle = e.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo (e) {
    e.preventDefault();

    onAddTodo({ title: todoTitle, id: Date.now() }); // Passing an object with title and a unique id
    setTodoTitle(""); //Reseting todoTitle
  }

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel todoTitle={todoTitle} onInputChange={handleTitleChange}>
      Title: 
     </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
