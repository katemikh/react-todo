import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
import style from './TodoList.module.css';
import PropTypes from 'prop-types';

const TodoList = ({ todoList, onRemoveTodo }) => {
  return (
    <ul className={style.todoList}>
      {todoList.map((item) => {
          return (
            <TodoListItem
              key={item.id}
              todo={item}
              onRemoveTodo={onRemoveTodo}
            />
          );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;
