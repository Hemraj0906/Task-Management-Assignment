

// eslint-disable-next-line no-unused-vars
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

// eslint-disable-next-line react/prop-types
const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
  console.log("Tasks:", tasks);

  const handleDelete = (taskId) => {
    // Filter tasks to remove the deleted task
    onDeleteTask(taskId);
  };

  const handleUpdate = (task) => {
    onUpdateTask(task);
  };

  return (
    <div>
     
      {tasks.map((task, index) => (
        <Draggable key={task._id} draggableId={task._id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <TaskCard
                key={task._id} 
                task={task}
                onDeleteTask={handleDelete} 
                onUpdateTask={handleUpdate} 
              />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default TaskList;


//--------------------------------------------
