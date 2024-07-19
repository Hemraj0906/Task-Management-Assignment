// eslint-disable-next-line no-unused-vars
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskList from "./TaskList";

// eslint-disable-next-line react/prop-types
const TaskListContainer = ({ tasks, onDeleteTask, onUpdateTask }) => {
  return (
    <Droppable droppableId="taskList">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <TaskList
            tasks={tasks}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskListContainer;


//-------------------------------------------

