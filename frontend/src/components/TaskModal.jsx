

// eslint-disable-next-line no-unused-vars
import React from "react";
import TaskForm from "./TaskForm";
import styles from "./TaskModal.module.css";


// eslint-disable-next-line react/prop-types
const TaskModal = ({ task, onClose, onSave }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{task ? "Update Task" : "Add Task"}</h2>
        <TaskForm task={task} onClose={onClose} onSave={onSave} />
      </div>
    </div>
  );
};

export default TaskModal;
