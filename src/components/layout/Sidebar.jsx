// src/components/layout/Sidebar.jsx
import { LayoutDashboard, MessageCircle, Users, Settings } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Home", icon: LayoutDashboard },
  { name: "Messages", icon: MessageCircle },
  { name: "Tasks", icon: LayoutDashboard },
  { name: "Members", icon: Users },
  { name: "Settings", icon: Settings },
];

const projectItems = [
  "Mobile App",
  "Website Redesign",
  "Design System",
  "Wireframes",
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r p-4 flex flex-col justify-between"
     style={{ borderRightColor: "#dfdfdf" }}>
      <div>
        {/* Logo */}
        <h1 className="text-xl font-bold text-purple-700 mb-8">Project M.</h1>

        {/* Nav Links */}
        <nav className="space-y-4">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-gray-700 text-sm hover:text-purple-700 cursor-pointer"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>

        {/* Project List */}
        <div className="mt-10">
          <p className="text-xs text-gray-400 mb-2">MY PROJECTS</p>
          <div className="space-y-2">
            {projectItems.map((project, idx) => (
              <div
                key={idx}
                className={clsx(
                  "text-sm cursor-pointer px-3 py-2 rounded flex justify-between items-center",
                  project === "Mobile App"
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span>{project}</span>
                <span>⋯</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thoughts Time */}
      <div className="bg-purple-50 p-3 rounded-xl text-xs text-gray-600 space-y-2">
        <p className="font-semibold">Thoughts Time</p>
        <p>
          We don’t have any notice for you, then you can share your thoughts
          with your peers.
        </p>
        <button className="bg-white border border-purple-200 px-3 py-1 rounded-full text-purple-600 text-xs font-medium hover:bg-purple-100">
          Write a message
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
