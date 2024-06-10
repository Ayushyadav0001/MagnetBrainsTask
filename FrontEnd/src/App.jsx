import React, { useState } from "react";
import Flex from "./Component/Flex/Flex";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login/Login";
import SignUp from "./Component/Login/SignUp"
const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId, title, description, dueDate, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, title, description, dueDate, status }
          : task
      )
    );
  };

  const updateStatus = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "Pending" ? "Completed" : "Pending",
            }
          : task
      )
    );
  };

  return (
    <div className=" ">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>


          <Route
            path="/Task"
            element={
              <Flex
                addTask={addTask}
                tasks={tasks}
                deleteTask={deleteTask}
                editTask={editTask}
                updateStatus={updateStatus}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
