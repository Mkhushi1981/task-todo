// src/components/ui/Tag.jsx
import React from "react";

const Tag = ({ text, color }) => {
  const base = "text-xs font-medium px-2 py-1 rounded";
  const colorMap = {
    low: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
    completed: "bg-green-100 text-green-700",
    default: "bg-gray-100 text-gray-700",
  };

  const tagColor = colorMap[color?.toLowerCase()] || colorMap.default;

  return <span className={`${base} ${tagColor}`}>{text}</span>;
};

export default Tag;
