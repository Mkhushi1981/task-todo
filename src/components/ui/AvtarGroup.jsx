// src/components/ui/AvtarGroup.jsx
import React from "react";

const AvtarGroup = ({ avatars = [] }) => {
  return (
    <div className="flex -space-x-2">
      {avatars.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Avatar ${index}`}
          className="w-6 h-6 rounded-full border-2 border-white"
        />
      ))}
    </div>
  );
};

export default AvtarGroup;
