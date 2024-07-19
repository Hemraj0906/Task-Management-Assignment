

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./TaskForm.module.css";

// eslint-disable-next-line react/prop-types
const TaskForm = ({ task, onClose, onSave }) => {
  // eslint-disable-next-line react/prop-types
  const [title, setTitle] = useState(task ? task.title : "");
  // eslint-disable-next-line react/prop-types
  const [description, setDescription] = useState(task ? task.description : "");
  // eslint-disable-next-line react/prop-types
  const [pipeline, setPipeline] = useState(task ? task.pipeline : "todo");
  // eslint-disable-next-line react/prop-types
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");
  // eslint-disable-next-line react/prop-types
  const [status, setStatus] = useState(task ? task.status : "pending");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react/prop-types
      setTitle(task.title);
      // eslint-disable-next-line react/prop-types
      setDescription(task.description);
      // eslint-disable-next-line react/prop-types
      setPipeline(task.pipeline);
      // eslint-disable-next-line react/prop-types
      setDueDate(task.dueDate);
      // eslint-disable-next-line react/prop-types
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (task) {
        response = await axios.put(
          `http://localhost:5000/api/tasks/${task._id}`,
          {
            title,
            description,
            pipeline,
            dueDate,
            userId,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/tasks",
          {
            title,
            description,
            pipeline,
            dueDate,
            userId,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

       
        if (response.status === 201) {
          window.location.reload();
          return; // Prevent further execution of onSave and onClose
        }
      }

      onSave(response.data.task || response.data); // Ensure correct data is passed
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.formInput}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={styles.formTextarea}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Pipeline</label>
        <select
          value={pipeline}
          onChange={(e) => setPipeline(e.target.value)}
          className={styles.formSelect}
        >
          <option value="todo">To Do</option>
          <option value="inprogress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Priority</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.formSelect}
        >
          <option value="pending">Pending</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className={(styles.formInput)}
        />
      </div>
      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          {task ? "Update" : "Save"}
        </button>
        <button type="button" onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
