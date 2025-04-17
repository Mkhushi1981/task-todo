// src/redux/tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper: Load tasks from localStorage
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("tasks");
    const parsed = data ? JSON.parse(data) : null;

    if (
      parsed &&
      typeof parsed === "object" &&
      parsed["To Do"] &&
      parsed["On Progress"] &&
      parsed["Done"]
    ) {
      return parsed;
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }

  // Fallback default structure
  return {
    "To Do": [
      {
        id: "1",
        title: "Design wireframes",
        description: "Sketch main screens",
      },
      {
        id: "2",
        title: "Create repo",
        description: "Setup GitHub and project board",
      },
    ],
    "On Progress": [
      {
        id: "3",
        title: "Build login screen",
        description: "UI for login page",
      },
    ],
    Done: [
      {
        id: "4",
        title: "Project setup",
        description: "Vite + Tailwind + Redux",
      },
    ],
  };
};

// Helper: Save tasks to localStorage
const saveToLocalStorage = (tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage", error);
  }
};

// Initial state from localStorage or default
const initialState = loadFromLocalStorage();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { status, task } = action.payload;
      state[status].push(task);
      saveToLocalStorage(state);
    },
    moveTask: (state, action) => {
      const { sourceColumn, destinationColumn, sourceIndex, destinationIndex } =
        action.payload;

      // Guard clause
      if (!state[sourceColumn] || !state[destinationColumn]) return;

      const sourceList = state[sourceColumn];
      const destList = state[destinationColumn];

      const [movedTask] = sourceList.splice(sourceIndex, 1);
      destList.splice(destinationIndex, 0, movedTask);

      saveToLocalStorage(state);
    },
    removeTask: (state, action) => {
      const { status, taskId } = action.payload;
      if (!state[status]) return;
      state[status] = state[status].filter((task) => task.id !== taskId);
      saveToLocalStorage(state);
    },
    toggleSubtask: (state, action) => {
      const { status, taskId, subtaskIndex } = action.payload;
      const task = state[status].find((t) => t.id === taskId);
      if (task && task.subtasks && task.subtasks[subtaskIndex]) {
        task.subtasks[subtaskIndex].done = !task.subtasks[subtaskIndex].done;
      }
    },
    addActivityLog: (state, action) => {
      const { status, taskId, log } = action.payload;
      const task = state[status].find((t) => t.id === taskId);
      if (task) {
        task.activityLog = task.activityLog || [];
        task.activityLog.unshift(log); // prepend new log
      }
    },
  },
});

export const { addTask, moveTask, removeTask, toggleSubtask, addActivityLog } =
  tasksSlice.actions;
export default tasksSlice.reducer;
