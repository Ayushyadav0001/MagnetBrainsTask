import React from "react";
import TaskCreationForm from "../Task/TaskCreation";
import TaskList from "../Task/TaskList";

const Flex = ({ addTask, tasks, deleteTask, editTask, updateStatus }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">
        Task Management System
      </h1>
      <div className=" sm:flex justify-between p-2 gap-2 ">
        <TaskCreationForm addTask={addTask}  />
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          editTask={editTask}
          updateStatus={updateStatus}
        />
      </div>
    </div>
  );
};

export default Flex;
