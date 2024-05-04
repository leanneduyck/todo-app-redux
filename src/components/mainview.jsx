import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, toggleItem, deleteItem } from "../actions/index.js";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";

// logic for rendering TodoList
export const MainView = () => {
  // local state for input value
  const [inputValue, setInputValue] = useState("");
  // dispatch function to dispatch actions
  const dispatch = useDispatch();
  // todos from store
  const todos = useSelector((state) => state.todos);

  // event handler for input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // event handler for adding item
  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      dispatch(addItem(inputValue));
      setInputValue("");
    } else {
      alert("You must write something.");
    }
  };

  // event handler for hitting enter key as submit
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddItem();
    }
  };

  // event handler for toggling item
  const handleToggleItem = (id) => {
    dispatch(toggleItem(id));
  };

  // event handler for deleting item
  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  // renders TodoList
  return (
    <div className="m-3" variant="secondary">
      <h1>Todo List:</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button className="m-3" variant="outline-primary" onClick={handleAddItem}>
        Add Item:
      </Button>
      <ul style={{ listStyleType: "none" }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? "strike" : ""}
            onDoubleClick={() => handleToggleItem(todo.id)}
          >
            {todo.text}
            <Button
              className="m-3"
              variant="outline-secondary"
              onClick={() => handleDeleteItem(todo.id)}
            >
              X{" "}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
