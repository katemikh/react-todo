import { useState } from "react";

function AddTodoForm ({onAddTodo}) {
  const [todoTitle, setTodoTitle] = useState(""); // Adding a state variable todoTitle

  const handleAddTodo = (event) => {
    event.preventDefault();

    onAddTodo({ title: todoTitle, id: Date.now() }); // Passing an object with title and a unique id
    setTodoTitle(""); //Reseting todoTitle
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title: </label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        value={todoTitle} // Making the input a controlled component
        onChange={(event) => setTodoTitle(event.target.value)} // Handling input changes
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
