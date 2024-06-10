import React, { useState } from 'react';

const TaskItem = ({ task, deleteTask, editTask, updateStatus, onClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleEdit = (e) => {
    e.preventDefault();
    editTask(task.id, editedTitle, editedDescription, editedDueDate, editedStatus);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <li className="p-4 bg-white shadow-md rounded-md mb-4 ">
      {isEditing ? (
        <form onSubmit={handleEdit} className="space-y-4">
          <div>
            <label htmlFor={`editTitle-${task.id}`} className="block text-gray-700 font-bold mb-2">Title:</label>
            <input
              type="text"
              id={`editTitle-${task.id}`}
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor={`editDescription-${task.id}`} className="block text-gray-700 font-bold mb-2">Description:</label>
            <textarea
              id={`editDescription-${task.id}`}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor={`editDueDate-${task.id}`} className="block text-gray-700 font-bold mb-2">Due Date:</label>
            <input
              type="date"
              id={`editDueDate-${task.id}`}
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor={`editStatus-${task.id}`} className="block text-gray-700 font-bold mb-2">Status:</label>
            <select
              id={`editStatus-${task.id}`}
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Save</button>
          <button type="button" onClick={() => setIsEditing(false)} className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">Cancel</button>
        </form>
      ) : (
        <>
          <div className="flex items-center">
            <span
              className={`inline-block w-4 h-4 rounded-full ${getPriorityColor(task.priority)} mr-2`}
            ></span>
            <h3 className="text-xl font-bold cursor-pointer" onClick={onClick}>{task.title}</h3>
          </div>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p className={`${task.status === 'Completed' ? 'text-green-600' : 'text-red-600'} font-semibold`}>Status: {task.status}</p>
          <div className="mt-4">
            <button onClick={() => setIsEditing(true)} className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">Edit</button>
            <button onClick={handleDelete} className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Delete</button>
            <button onClick={() => updateStatus(task.id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              {task.status === 'Pending' ? 'Complete' : 'Reopen'}
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
