// src/components/ProjectToolbar.jsx
import React from "react";
import Button from "./ui/Button";
import { Filter, Calendar, Share2, LayoutGrid, Link2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setPriorityFilter } from "../features/filters/filterSlice";
import avatar1 from "../assets/avatars/1.png";
import avatar2 from "../assets/avatars/2.png";
import avatar3 from "../assets/avatars/3.png";
import avatar4 from "../assets/avatars/4.png";
import avatar5 from "../assets/avatars/5.png";

const ProjectToolbar = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.filters.priority);

  const [showFilterDropdown, setShowFilterDropdown] = React.useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".filter-dropdown")) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
  ];

  return (
    <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
      {/* Left section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Mobile App
          <Link2 className="w-4 h-4 text-purple-500" />
          <Link2 className="w-4 h-4 text-purple-500" />
        </h1>
        <div className="flex gap-2">
          {/* Filter dropdown */}
          <div className="relative filter-dropdown">
            <Button
              variant="outline"
              className="text-sm flex items-center gap-2"
              onClick={() => setShowFilterDropdown((prev) => !prev)}
            >
              <Filter className="w-4 h-4" /> Filter
            </Button>

            {showFilterDropdown && (
              <div className="absolute mt-2 w-36 bg-white border rounded shadow-md z-10">
                {["All", "Low", "Medium", "High"].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => {
                      dispatch(setPriorityFilter(priority));
                      setShowFilterDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      currentFilter === priority
                        ? "bg-purple-50 font-semibold text-purple-700"
                        : ""
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button variant="outline" className="text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Today
          </Button>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 flex-wrap">
        <button className="text-sm text-purple-600 font-medium flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          Invite
        </button>

        <div className="flex -space-x-2">
          {avatars.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="avatar"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          ))}
          <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white text-sm flex items-center justify-center text-gray-500">
            +2
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-sm flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <div className="h-6 border-l" />
          <Button variant="default" size="icon">
            <LayoutGrid className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectToolbar;
