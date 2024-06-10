import React, { useState } from "react";
import TaskItem from "./TaskItem";
import Modal from "react-modal";

Modal.setAppElement("#root");

const TaskList = ({ tasks, deleteTask, editTask, updateStatus }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 2;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const sortedTasks = [...currentTasks].sort((a, b) => {
    if (a.priority === "High" && b.priority !== "High") {
      return -1;
    } else if (a.priority !== "High" && b.priority === "High") {
      return 1;
    } else {
      return 0;
    }
  });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const closeModal = () => setSelectedTask(null);

  return (
    <div className="mt-8  border shadow-gray-400 shadow-lg  md:w-2/4 ">
      <h2 className="text-2xl font-bold mb-4 text-center">Tasks</h2>
      <ul className="space-y-4 ">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editTask={editTask}
            updateStatus={updateStatus}
            onClick={() => setSelectedTask(task)}
          />
        ))}
      </ul>
      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          onRequestClose={closeModal}
          contentLabel="Task Details"
          className="bg-white p-8 rounded-md shadow-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h3 className="text-xl font-bold mb-4">{selectedTask.title}</h3>

          <p className="text-wrap">{selectedTask.description}</p>

          <p className="mb-2">
            <strong>Due Date:</strong> {selectedTask.dueDate}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {selectedTask.status}
          </p>
          <button
            onClick={closeModal}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </Modal>
      )}
      <div className="flex justify-center mt-4 p-2">
        {tasks.length < 3
          ? ""
          : Array.from(
              { length: Math.ceil(tasks.length / tasksPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 rounded-md ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
      </div>
    </div>
  );
};

export default TaskList;
