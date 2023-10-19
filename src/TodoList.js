import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
    { id: 1, title: "Complete assignment 1" },
    { id: 2, title: "Go for a run" },
    { id: 3, title: "Read React book" },
];

  //the style
const listItemStyle = {
    listStyle: "none", // Removing default list bullet points
};
function TodoList() {

return (
  <ul>
    {todoList.map((todo) => (
      <TodoListItem key={todo.id} todo={todo} style={listItemStyle} />
    ))}
  </ul>
);
}

export default TodoList;
