// src/App.jsx
import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend
  useEffect(() => {
    fetch('https://todobackend-htch.onrender.com/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = async (id) => {
    await fetch(`https://todobackend-htch.onrender.com/api/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const updateTodo = async (id, updatedTitle) => {
    // Call the update API
    await fetch(`https://todobackend-htch.onrender.com/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: updatedTitle }),
    });

    // Update the local state
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, title: updatedTitle } : todo
      )
    );
  };

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    </div>
  );
};

export default App;
