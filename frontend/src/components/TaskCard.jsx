


// eslint-disable-next-line no-unused-vars
import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./TaskCard.css";

// eslint-disable-next-line react/prop-types
const TaskCard = ({ task, onDeleteTask, onUpdateTask }) => {
  console.log("Task:", task);

  const handleUpdate = () => {
    onUpdateTask(task);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, config);
      window.location.reload();
      onDeleteTask(task._id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="card">
      <div className="status-strip"></div>
      <h3>{task.title}</h3>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Due Date:</strong> {task.dueDate}
      </p>
      <div>
        

      <p className="chip">
       
        {task.status}
      </p>
      </div>

      <div className="icon-container">
        <button className="icon update-icon" onClick={handleUpdate}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="icon delete-icon" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

