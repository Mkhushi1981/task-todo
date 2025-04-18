// src/components/TaskColumn.jsx
import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTask, moveTask, removeTask } from "../../features/tasks/taskSlice";

const TaskColumn = ({ status, borderColor, dotColor }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    subtasks: [],
    tags: [],
  });

  // Get priority filter from Redux
  const priorityFilter = useSelector((state) => state.filters.priority);

  // Get all tasks for this column
  const allTasks = useSelector((state) => state.tasks[status] || []);

  // Apply filtering based on priority
  const tasks =
    priorityFilter === "All"
      ? allTasks
      : allTasks.filter((task) => task.priority === priorityFilter);

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: "TASK",
      drop: (item) => {
        if (item.from !== status) {
          dispatch(
            moveTask({
              sourceColumn: item.from,
              destinationColumn: status,
              sourceIndex: item.index,
              destinationIndex: 0, // Drop at top
            })
          );
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [status, dispatch]
  );

  const handleAddTask = () => {
    if (!formData.title.trim()) return;

    const newTask = {
      id: uuidv4(),
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dueDate: formData.dueDate,
      comments: 0,
      files: 0,
      avatars: [],
      subtasks: formData.subtasks || [], // 🆕
      tags: formData.tags || [],
      activityLog: [
        {
          type: "created",
          message: `Task created.`,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    dispatch(addTask({ status, task: newTask }));
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      subtasks: [],
      tags: [],
    });

    setShowModal(false);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(removeTask({ status, taskId }));
  };

  return (
    <>
      <div
        ref={dropRef}
        className={`bg-gray-50 rounded-xl p-4 shadow-sm transition-colors ${
          isOver ? "bg-purple-50" : ""
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dotColor}`} />
            <h2 className="text-sm font-medium text-gray-800">{status}</h2>
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-600">
              {tasks.length}
            </span>
          </div>
          {status === "To Do" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple-100 hover:bg-purple-200 text-purple-600 rounded-full p-1"
            >
              <Plus size={14} />
            </button>
          )}
        </div>

        <div className={`border-t-2 ${borderColor} mb-4`} />

        {/* Task Cards */}
        <div className="space-y-4">
          {tasks
            .filter((task) => task && task.id)
            .map((task, index) => (
              <TaskCard
                key={task.id}
                task={{ ...task, from: status, index }}
                onDelete={handleDeleteTask}
              />
            ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Add New Task</h3>

            <input
              type="text"
              placeholder="Title"
              className="w-full border px-3 py-2 rounded text-sm"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              className="w-full border px-3 py-2 rounded text-sm"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <select
              className="w-full border px-3 py-2 rounded text-sm"
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded text-sm"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {formData.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() =>
                        setFormData({
                          ...formData,
                          tags: formData.tags.filter((_, i) => i !== idx),
                        })
                      }
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type and press Enter"
                className="mt-2 w-full border px-3 py-2 rounded text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    e.preventDefault();
                    if (!formData.tags.includes(e.target.value.trim())) {
                      setFormData({
                        ...formData,
                        tags: [...formData.tags, e.target.value.trim()],
                      });
                    }
                    e.target.value = "";
                  }
                }}
              />
            </div>

            {/* Subtask Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Subtasks
              </label>
              {formData.subtasks?.map((subtask, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="flex-1 border px-2 py-1 text-sm rounded"
                    value={subtask.text}
                    onChange={(e) => {
                      const updated = [...formData.subtasks];
                      updated[idx].text = e.target.value;
                      setFormData({ ...formData, subtasks: updated });
                    }}
                  />
                  <button
                    className="text-xs text-red-500"
                    onClick={() => {
                      const updated = [...formData.subtasks];
                      updated.splice(idx, 1);
                      setFormData({ ...formData, subtasks: updated });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    subtasks: [
                      ...(formData.subtasks || []),
                      { text: "", done: false },
                    ],
                  })
                }
                className="text-sm text-purple-600 mt-1"
              >
                + Add Subtask
              </button>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="text-sm bg-purple-600 text-white px-4 py-1.5 rounded hover:bg-purple-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskColumn;
