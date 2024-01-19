import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function ReactTodo() {
    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

  // Create a new variable url
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

  // New async function fetchData
    const fetchData = async () => {
    // Declare empty object variable options
    const options = {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
    };

    //console.log('API Token:', process.env.REACT_APP_AIRTABLE_API_TOKEN);
    //console.log('API Token:', process.env.REACT_APP_AIRTABLE_BASE_ID);

    try {
      // Fetch data from Airtable
        const response = await fetch(url, options);

      // Check if the response is okay, throw an error if not
        if (!response.ok) {
        // throw new Error(`Error: ${response.status}`);
        // or 2nd option
        const message = `Error: ${response.status}`;
        throw new Error(message);
        }

      // Parse the response data
        const data = await response.json();

      // Console.log the data for observation
        console.log('example response:', data);

      // Map data.records into an array of todo objects
        const todos = data.records.map((todo) => {
        const newTodo = {
            title: todo.fields.title,
            id: todo.id,
        };
        return newTodo;
        });

      // Console.log the transformed todos array
        console.log('Transformed Todos:', todos);

      // Set the application's todoList
        setTodoList(todos);
        setIsLoading(false);
    } catch (error) {
      // Console.log the error's message
        console.log(error.message);
    }
    };

    useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //the empty dependency array

    useEffect(() => {
    if (!isLoading) {
        localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
    }, [todoList, isLoading]);

  //to add an item to Airtable
    const addTodo = async (todo) => {
    const airtableData = {
        fields: {
        title: todo,
        },
    };

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify(airtableData),
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
        const message = `Error has ocurred: ${response.status}`;
        throw new Error(message);
        }

        const resp = await response.json();
        const newTodo = { id: resp.id, title: resp.fields.title };
        setTodoList([...todoList, newTodo]);
    } catch (error) {
        console.log(error.message);

        return null;
    }
    };

  // remove an item from Airtable
    const removeTodo = async (id) => {
    const options = {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
        },
    };

    try {
        const response = await fetch(`${url}/${id}`, options);

        if (!response.ok) {
        const message = `Error has ocurred: ${response.status}`;
        throw new Error(message);
        }

        const newList = todoList.filter((item) => item.id !== id);
        setTodoList(newList);
    } catch (error) {
      // console.log(error.message);
      // console.log('API Token:', process.env.REACT_APP_AIRTABLE_API_TOKEN);
        return null;
    }
    };

    return (
    <>
        <div style={{ textAlign: 'center' }}>
        <h1>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        )}
        </div>
    </>
    );
}

export default ReactTodo;
