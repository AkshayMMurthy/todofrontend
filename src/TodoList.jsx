// src/TodoList.jsx
import React, { useState } from 'react';

const TodoList = ({ todos, deleteTodo, updateTodo }) => {
  const [editId, setEditId] = useState(null);  // Track which todo is being edited
  const [editTitle, setEditTitle] = useState('');  // Track the edited title

  const handleEditClick = (todo) => {
    setEditId(todo._id);  // Set the current todo id being edited
    setEditTitle(todo.title);  // Set the current todo title in input
  };

  const handleSaveClick = () => {
    updateTodo(editId, editTitle);  // Call the updateTodo function
    setEditId(null);  // Exit edit mode
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          {editId === todo._id ? (
            // Edit mode: show input for editing
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="todo-edit-input"
            />
          ) : (
            // Normal mode: show the todo title
            <span>{todo.title}</span>
          )}
          <div className="todo-actions">
            {editId === todo._id ? (
              <button onClick={handleSaveClick} className="save-btn">
                Save
              </button>
            ) : (
              <button onClick={() => handleEditClick(todo)} className="update-btn">
                Update
              </button>
            )}
            <button onClick={() => deleteTodo(todo._id)} className="delete-btn">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
