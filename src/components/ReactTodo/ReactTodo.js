import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import TodoList from '../TodoList/TodoList.js';
import AddTodoForm from '../AddTodoForm/AddTodoForm.js';
import style from './ReactTodo.module.css';

function ReactTodo ({ tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sort, setSort] = useState('asc');

  // Create a new variable url
  // const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;

  //Get access from Airtable
  const fetchData = useCallback(async () => {
    // Declare empty object variable options
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      // Fetch data from Airtable
      // const response = await fetch(url, options); - old
      const response = await fetch(`${url}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sort}`, options); //updated

      // Check if the response is okay, throw an error if not
      if (!response.ok) {
        // throw new Error(`Error: ${response.status}`);
        // or 2nd option
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      // Parse the response data
      const data = await response.json();

 // sort todo	
      // data.records.sort((objectA, objectB) => {	
      //   const titleA = objectA.fields.title.toLowerCase();	
      //   const titleB = objectB.fields.title.toLowerCase();	

      //   if (titleA === titleB) {	
      //     return 0;	
      //   }	

      //   // sort function in ascending order	
      //   return titleA < titleB ? -1 : 1;	

      //   // sort function in descending order	
      //   // return titleA < titleB ? 1 : -1;	
      // });
      
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
  }, [sort, url]);

  // sort todo with toggle button
    const handleSort = () => {
    const toggleSort = sort === 'asc' ? 'desc' : 'asc';
    setSort(toggleSort);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, sort]); 

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
      <div className={style.container}>
        <h1 className={style.heading}>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <button className={style.btnToggle} onClick={handleSort}>
          {sort === 'asc' ? 'from Z to A' : 'from A to Z'}
        </button>
        {isLoading ? (
          <p className={style.loading}>Loading...</p>
        ) : (
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
        )}
      </div>
    </>
  );
}
ReactTodo.propTypes = {
  tableName: PropTypes.string,
};

export default ReactTodo;
