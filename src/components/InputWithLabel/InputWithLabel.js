import React, { useEffect } from "react";
import style from './InputWithLabel.module.css';
import PropTypes from 'prop-types';

const InputWithLabel = ({  
  id, 
  name, 
  todoTitle, 
  onInputChange, 
  children, 
  type = 'text' }) => {
  const inputRef = React.useRef();

  useEffect(() => {
    inputRef.current.focus();
  },[]);

  return (
    <>
      <label htmlFor={id}> {children} </label>
      <input
        id={id}
        type={type}
        value={todoTitle}
        name={name}
        onChange={onInputChange}
        ref={inputRef}
        className={style.formInput}
        placeholder="Type new task..."
      />
    </>
  );
};

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  todoTitle: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  children: PropTypes.node,
};

export default InputWithLabel;
