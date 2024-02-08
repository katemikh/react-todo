import React, { useEffect } from "react";
import style from './InputWithLabel.module.css';

const InputWithLabel = ({  id, name, todoTitle, onInputChange, children }) => {
  const inputRef = React.useRef();

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    // JSX for label and input goes here
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type="text"
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

export default InputWithLabel;
