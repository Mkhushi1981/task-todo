// src/components/ui/DatePicker.jsx
import React from "react";

const DatePicker = () => {
  return (
    <select className="px-4 py-2 text-sm border border-gray-300 rounded">
      <option value="today">Today</option>
      <option value="this-week">This Week</option>
      <option value="this-month">This Month</option>
    </select>
  );
};

export default DatePicker;
