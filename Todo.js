import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/Todo.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [showAddBtn, setShow] = useState(true);
  const [updateId, setUpdateId] = useState(0);
  // this useEffect is used for get the todos from local storage
  useEffect(() => {
    let todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);
  // This useEffect is used for save the todos in localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  // This function is used for add the task into todo list
  const addTodos = () => {
    setShow(true);
    if (input.trim() !== "") {
      // this three commented lines are used for create todo. we can use like this also
      // Method:1
      // let newData=[...todos];
      // newData.push({id:Date.now(),task:input,completed:false});
      // setTodos(newData);
      // Method:2
      let newTodo = {
        id: Date.now(),
        task: capitalizeFirstLetter(input),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput(""); // this is for clear the input field
    } else {
      toast.warning("Please Enter a task");
    }
  };
  // This function is used for edit the todo list
  const editTodo = (id) => {
    setShow(false);
    todos.map((item) => {
      if (item.id === id) {
        setInput(item.task);
        setUpdateId(item.id);
      }
      return item;
    });
  };
  // This function is used for delete the todo
  const deleteTodo = (id) => {
    let results = todos.filter((item) => !(item.id === id));
    setTodos(results);
    // because if array contains last item and any one click on edit and then click on delete for that time input should be empty and add button should be show
    setInput("");
    setShow(true);
  };
  // This function is used for update the todos list
  const updateTodos = () => {
    if (input.trim() !== "") {
      let results = todos.map((item) => {
        if (item.id === updateId) {
          item.task = capitalizeFirstLetter(input);
        }
        return item;
      });
      setTodos(results);
      setInput("");
      setShow(true);
    } else {
      toast.warning("Please Enter Task");
    }
  };
  // This function is used for show the task is completed or not
  const handleCheckBox = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };
  // This function is used for capitalize first letter of each items.
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="main-container">
      <div className="todo-header">
        <h3> My To-Do List</h3> <br /> <hr /> <br />
        <div>
          <input
            type="text"
            className="todo-input"
            placeholder="Enter a Task"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          {showAddBtn && (
            <button onClick={addTodos} className="addBtn">
              Add
            </button>
          )}
          {!showAddBtn && (
            <button onClick={updateTodos} className="addBtn">
              Update
            </button>
          )}
        </div>
      </div>
      <div className="todo-items-container">
        {todos.map((item) => {
          return (
            <div key={item.id} className="todo-item">
              <div>
                <input
                  type="checkbox"
                  onChange={() => handleCheckBox(item.id)}
                  checked={item.completed}
                  className="check"
                />
                <span className={`${item.completed ? "completed" : ""}`}>
                  {item.task}
                </span>
              </div>
              <div className="btn-container">
                <button onClick={() => editTodo(item.id)} className="edit-btn">
                  {" "}
                  <i class="bi bi-pencil-square"></i>{" "}
                </button>
                <button
                  onClick={() => deleteTodo(item.id)}
                  className="delete-btn"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
