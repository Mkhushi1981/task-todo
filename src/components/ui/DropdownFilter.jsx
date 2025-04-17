// src/components/ui/DropdownFilter.jsx
import React from "react";

const DropdownFilter = () => {
  return (
    <select className="px-4 py-2 text-sm border border-gray-300 rounded">
      <option value="all">All</option>
      <option value="high">High Priority</option>
      <option value="low">Low Priority</option>
    </select>
  );
};

export default DropdownFilter;
