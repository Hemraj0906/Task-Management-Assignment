



// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskListContainer from "../components/TaskListContainer";
import TaskModal from "../components/TaskModal";
import styles from "./TaskListPage.module.css";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          `http://localhost:5000/api/tasks/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = () => {
    setTaskToEdit(null); // Ensure no task is being edited
    setIsModalOpen(true);
  };

  const handleUpdateTask = (task) => {
    setTaskToEdit(task); // Set task to be edited
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTask = (savedTask) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex(
        (task) => task._id === savedTask._id
      );
      if (taskIndex !== -1) {
        // Update existing task
        const updatedTasks = [...prevTasks];
        updatedTasks[taskIndex] = savedTask;
        return updatedTasks;
      } else {
        // Add new task
        return [...prevTasks, savedTask];
      }
    });
    handleCloseModal();
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = Array.from(tasks);

    const movedTaskIndex = updatedTasks.findIndex(
      (task) => task._id === draggableId
    );
    const movedTask = updatedTasks[movedTaskIndex];

    updatedTasks.splice(source.index, 1);

    const isDuplicate = updatedTasks.some(
      (task) =>
        task.pipeline === destination.droppableId && task._id === draggableId
    );

    if (!isDuplicate) {
      movedTask.pipeline = destination.droppableId;

      updatedTasks.splice(destination.index, 0, movedTask);

      const reorderedTasks = updatedTasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      setTasks(reorderedTasks);

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.put(
          `http://localhost:5000/api/tasks/${movedTask._id}`,
          movedTask,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedTask = response.data.task || response.data;

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized: Redirect to login page or refresh token");
        } else {
          console.error("Error:", error);
        }
      }
    } else {
      setTasks(tasks);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={handleAddTask} className={styles.addTaskButton}>
        Add Task
      </button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.pipelineContainer}>
          {["todo", "inprogress", "review", "done"].map((pipeline) => (
            <Droppable key={pipeline} droppableId={pipeline}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={styles.pipeline}
                >
                  <h2>{pipeline}</h2>
                  <TaskListContainer
                    tasks={tasks.filter((task) => task.pipeline === pipeline)}
                    onDeleteTask={handleDeleteTask}
                    onUpdateTask={handleUpdateTask}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {isModalOpen && (
        <TaskModal
          task={taskToEdit}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default TaskListPage;
