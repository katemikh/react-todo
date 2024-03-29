import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactTodo from './components/ReactTodo/ReactTodo';
import './App.css';

function App() {
  const tableName = process.env.REACT_APP_TABLE_NAME;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReactTodo tableName={tableName} />}></Route>
        <Route path="/new" element={<h1>New Todo List</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
