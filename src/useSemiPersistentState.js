import { useState, useEffect } from "react";

function useSemiPersistentState() {
/* // Geting the "savedTodoList" item from localStorage or use an empty array as a default value
    const initialTodoList =
    JSON.parse(localStorage.getItem("savedTodoList")) || [];
*/
    const [todoList, setTodoList] = useState(() => {
    // Geting the state from localStorage, or use an empty array as the default
    const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList"));
    
    return savedTodoList || [];
});

// Using useEffect to save todoList to localStorage when it changes
    useEffect(() => {
// Saving the todoList/data to localStorage as a string whenever it changes
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
}, [todoList]);

return [todoList, setTodoList];
}

export default useSemiPersistentState;