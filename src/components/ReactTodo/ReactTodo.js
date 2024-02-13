import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import TodoList from '../TodoList/TodoList.js';
import AddTodoForm from '../AddTodoForm/AddTodoForm.js';
import style from './ReactTodo.module.css';

function ReactTodo ({ tableName }) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');

  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${tableName}`;

  const fetchData = useCallback(async () => {
    const options = {
      method: 'GET',
      headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };

    try {

      const response = await fetch(
        `${url}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=${sortOrder}`, 
        options
      ); 

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      const todos = data.records.map((todo) => {
        const newTodo = {
          title: todo.fields.title,
          id: todo.id,
        };
        return newTodo;
      });

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [sortOrder, url]);

  // sort todo with toggle button
  //   const handleSort = () => {
  //   const toggleSort = sort === 'asc' ? 'desc' : 'asc';
  //   setSort(toggleSort);
  // };

  // other option

    const handleSort = () => {
      setSortOrder((prevSortOrder) =>
        prevSortOrder === 'asc' ? 'desc' : 'asc'
      );
    };

  useEffect(() => {
    fetchData();
  }, [fetchData, sortOrder]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

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
      const newTodo = { 
        id: resp.id, 
        title: resp.fields.title 
      };
      setTodoList([...todoList, newTodo]);
    } catch (error) {
      console.log(error.message);

      return null;
    }
  };

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
      console.log(error.message);
      return null;
    }
  };

  return (
    <>
      <div className={style.container}>
        <h1 className={style.heading}>Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <button type="button" className={style.btnToggle} onClick={handleSort}>
          {sortOrder === 'asc' ? 'from Z to A' : 'from A to Z'}
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
