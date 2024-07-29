// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import "./App.css";
import imag from "./images/todolist.png";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = { text: inputValue, completed: false };
      setTasks([...tasks, newTask]);
      setInputValue("");
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    } else {
      alert("You must write a task!");
    }
  };

  const filterTasks = (type) => {
    setFilterType(type);
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const taskCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="container">
      <div className="todo-app">
        <h2 className="title">
          To-Do-List
          <img src={imag} />
        </h2>
        <div className="row">
          <input
            type="text"
            id="input-box"
            placeholder="Add your text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="input-box"
          />
          <button onClick={addTask} className="add-task-button">
            Add Task
          </button>
        </div>
        <ul id="list-container" className="task-list">
          {tasks
            .filter((task) => {
              if (filterType === "all") return true;
              if (filterType === "pending") return !task.completed;
              if (filterType === "completed") return task.completed;
            })
            .map((task, index) => (
              <li key={index} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  className="task-checkbox"
                />
                <span
                  onClick={() => toggleTask(index)}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                  className="task-text"
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(index)}
                  className="delete-button"
                >
                  X
                </button>
              </li>
            ))}
        </ul>
        <div className="filter-buttons">
          <button
            onClick={() => filterTasks("all")}
            className={filterType === "all" ? "active" : ""}
          >
            All
          </button>
          <button
            onClick={() => filterTasks("pending")}
            className={filterType === "pending" ? "active" : ""}
          >
            Pending
          </button>
          <button
            onClick={() => filterTasks("completed")}
            className={filterType === "completed" ? "active" : ""}
          >
            Completed
          </button>
        </div>
        <div id="task-count" className="task-count">
          Tasks Pending: {taskCount}
        </div>
      </div>
    </div>
  );
}

export default App;
