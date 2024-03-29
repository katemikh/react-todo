import React from "react";
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types';

function TodoListItem({ todo, onRemoveTodo }) {
    return (
      <li className={style.ListItem}>
        {todo.title}
        <button
          type="button"
          className={style.btnRemove}
          onClick={() => onRemoveTodo(todo.id)}
        >
          Remove
        </button>
      </li>
    );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
