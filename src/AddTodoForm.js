import React from "react";

const AddTodoForm = (props) => {

    function handleAddTodo(event) {
      event.preventDefault(); 
      const form = event.target;
      const todoTitle = form["title"].value; 
      console.log(todoTitle);

      props.onAddTodo(todoTitle);
      form.reset();
    }

    return (
      <form onSubmit={handleAddTodo}>
        <label htmlFor="todoTitle">Title: </label>
        <input type="text" id="todoTitle" name="title" />
        <button type="submit">Add</button>
      </form>
    );

    
}

export default AddTodoForm;
