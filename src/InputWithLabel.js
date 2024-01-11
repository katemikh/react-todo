import React, { useEffect } from "react";

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
      />
    </>
  );
};

export default InputWithLabel;
