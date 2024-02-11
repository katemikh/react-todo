import React, { useState } from 'react';
import InputWithLabel from '../InputWithLabel/InputWithLabel';
import style from './AddTodoForm.module.css';
import PropTypes from 'prop-types';

const AddTodoForm = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState(''); // Adding a state variable todoTitle

  const handleTitleChange = (e) => {
    let newTodoTitle = e.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    if (todoTitle === '') {
      return;
    }

    onAddTodo(todoTitle);
    setTodoTitle(''); //Reseting todoTitle
  };

  return (
    <form onSubmit={handleAddTodo} className={style.form}>
      <InputWithLabel
        id="todoTitle"
        name="title"
        todoTitle={todoTitle}
        onInputChange={handleTitleChange}
      ></InputWithLabel>
      <button type="submit" className={style.btnAdd}>
        Add
      </button>
    </form>
  );
};

AddTodoForm.propsTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
