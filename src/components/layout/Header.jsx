// src/components/layout/Header.jsx
import { Search, CalendarDays, Bell, Grid } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-white"
      style={{ borderBottomColor: "#dfdfdf" }}>
      {/* Title & Links */}
      <div className="space-y-1">
  <div className="relative">
    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search for anything..."
      className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none"
      style={{ borderColor: "#dfdfdf" }}
    />
  </div>
</div>


      {/* Actions */}
      <div className="flex items-center gap-6">
        {/* Search */}
        {/* <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for anything..."
            className="pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none"
          />
        </div> */}

        {/* Icons */}
        <div className="flex items-center gap-4 text-gray-600">
          <CalendarDays className="w-5 h-5" />
          <Bell className="w-5 h-5" />
          <Grid className="w-5 h-5" />
        </div>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
            K
          </div>
          <div className="text-sm">
            <p className="font-medium">Khushi Singh</p>
            <p className="text-xs text-gray-400">Uttar Pradesh, India</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
