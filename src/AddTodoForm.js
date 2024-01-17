import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState(""); // Adding a state variable todoTitle

  const handleTitleChange = (e) => {
    let newTodoTitle = e.target.value;
    setTodoTitle(newTodoTitle);
  }

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (todoTitle === '') {
      return;
    }

    onAddTodo(todoTitle);
    setTodoTitle(""); //Reseting todoTitle
  }

  return (
    <form onSubmit={handleAddTodo}>
      <InputWithLabel
        id="todoTitle"
        name="title"
        todoTitle={todoTitle}
        onInputChange={handleTitleChange}
      >
        Title:
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
