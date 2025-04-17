// src/components/ui/Button.jsx
import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
