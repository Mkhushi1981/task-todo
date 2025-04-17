// src/components/TaskCard.jsx
import React from "react";
import { useDrag } from "react-dnd";
import { MessageCircle, Paperclip, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleSubtask, addActivityLog } from "../../features/tasks/taskSlice"; // adjust path as needed

const TaskCard = ({ task, onDelete }) => {
  const getDueDateStatus = (dueDate) => {
    if (!dueDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "overdue";
    if (diffDays === 0) return "today";
    if (diffDays <= 7) return "soon";
    return null;
  };

  const dueStatus = getDueDateStatus(task.dueDate);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: {
      id: task.id,
      from: task.from,
      index: task.index,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`relative bg-gray-50 rounded-xl shadow-sm p-4 space-y-2 hover:shadow-md transition-shadow ${
        isDragging ? "opacity-50" : "opacity-100"
      } ${dueStatus === "overdue" ? "border border-red-300" : ""}`}
    >
      {/* Priority & Due Status Badges */}
      <div className="flex items-center justify-between">
        <div
          className={`text-xs font-medium px-2 py-1 rounded ${
            task.priority === "Low"
              ? "bg-yellow-100 text-yellow-700"
              : task.priority === "High"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {task.priority || "Medium"}
        </div>

        {dueStatus && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              dueStatus === "overdue"
                ? "bg-red-100 text-red-700"
                : dueStatus === "today"
                ? "bg-orange-100 text-orange-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {dueStatus === "overdue"
              ? "Overdue"
              : dueStatus === "today"
              ? "Due Today"
              : "Due Soon"}
          </span>
        )}
      </div>

      {/* Due Date */}
      {task.dueDate && (
        <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
      )}

      {/* Title & Description */}
      <h3 className="text-base font-semibold text-gray-800">{task.title}</h3>
      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs text-purple-700">
          {task.tags.map((tag, idx) => (
            <span key={idx} className="bg-purple-100 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-500">{task.description}</p>

      {task.subtasks && task.subtasks.length > 0 && (
        <div className="space-y-1">
          {task.subtasks.map((subtask, idx) => (
            <label
              key={idx}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={subtask.done}
                onChange={() => {
                  dispatch(
                    toggleSubtask({
                      status: task.from,
                      taskId: task.id,
                      subtaskIndex: idx,
                    })
                  );
                  dispatch(
                    addActivityLog({
                      status: task.from,
                      taskId: task.id,
                      log: {
                        type: "subtask-toggled",
                        message: `Marked "${subtask.text}" as ${
                          subtask.done ? "incomplete" : "complete"
                        }`,
                        timestamp: new Date().toISOString(),
                      },
                    })
                  );
                }}
              />
              <span
                className={subtask.done ? "line-through text-gray-400" : ""}
              >
                {subtask.text}
              </span>
            </label>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex -space-x-2">
          {(task.avatars || []).map((avatar, idx) => (
            <img
              key={idx}
              src={avatar}
              alt="avatar"
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          ))}
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-4 h-4" />
            <span>{task.comments ?? 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Paperclip className="w-4 h-4" />
            <span>{task.files ?? 0}</span>
          </div>
        </div>
        {task.activityLog && task.activityLog.length > 0 && (
          <details className="mt-2 text-xs text-gray-500">
            <summary className="cursor-pointer text-gray-600">
              Activity Log
            </summary>
            <ul className="mt-1 space-y-1 pl-2 list-disc">
              {task.activityLog.map((log, idx) => (
                <li key={idx}>
                  <span className="block">{log.message}</span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        )}

        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
