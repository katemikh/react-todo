// InputWithLabel.js
import React from 'react';

const InputWithLabel = ({ todoTitle, onInputChange, children }) => {
    const inputRef = React.useRef();

    React.useEffect(() => {
      inputRef.current.focus();
    })
  return (
    // JSX for label and input goes here
     <>
      <label htmlFor="todoTitle"> {children} </label>
      <input
      id="todoTitle"
        type="text"
        value={todoTitle}
        name="title"
        onChange={onInputChange}
        ref={inputRef}
      />
    </>
    );
};

export default InputWithLabel;