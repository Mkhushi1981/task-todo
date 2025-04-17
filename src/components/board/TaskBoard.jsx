// src/components/TaskBoard.jsx
import React from "react";
import TaskColumn from "./TaskColumn";
import ProjectToolbar from "../ProjectToolBar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TaskBoard = () => {
  const columns = [
    { status: "To Do", color: "border-purple-500", dot: "bg-purple-600" },
    { status: "On Progress", color: "border-yellow-500", dot: "bg-yellow-500" },
    { status: "Done", color: "border-green-500", dot: "bg-green-500" },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <ProjectToolbar />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((col) => (
            <TaskColumn
              key={col.status}
              status={col.status}
              borderColor={col.color}
              dotColor={col.dot}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
