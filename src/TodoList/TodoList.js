import React from "react";
import TodoListItem from '../TodoListItem/TodoListItem';
import style from './TodoList.module.css';

  const TodoList = ({ todoList, onRemoveTodo }) => {

return (
  <ul className={style.todoList}>
    {todoList.map((item) => (
      <TodoListItem key={item.id} todo={item} onRemoveTodo={onRemoveTodo} />
    ))}
  </ul>
);
}

export default TodoList;
