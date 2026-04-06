import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router-dom";
import {
  BellIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
  MessageSquareIcon,
  CompassIcon,
  ShipWheelIcon,
  LogOutIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const [collapsed, setCollapsed] = useState(false);

  // Hardcode logout for visual completion (supposed to be handled by an auth store/hook usually)
  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <aside
      className={`bg-surface border-r border-white/5 hidden lg:flex flex-col h-screen sticky top-0 transition-all duration-300 z-20 ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 bg-surface-light border border-white/10 rounded-full p-1 hover:bg-primary/20 hover:text-primary transition-colors text-textSecondary z-50"
      >
        {collapsed ? (
          <ChevronRightIcon size={14} />
        ) : (
          <ChevronLeftIcon size={14} />
        )}
      </button>

      {/* Brand */}
      <div
        className={`p-6 flex items-center border-b border-white/5 ${collapsed ? "justify-center px-0" : "justify-start gap-3"}`}
      >
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all">
            <ShipWheelIcon className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-xl font-display font-bold text-textPrimary tracking-wide">
              Collab<span className="text-primary font-light">Sphere</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto overflow-x-hidden">
        <NavItem
          icon={HomeIcon}
          label="Home"
          to="/"
          currentPath={currentPath}
          collapsed={collapsed}
        />
        <NavItem
          icon={MessageSquareIcon}
          label="Messages"
          to="/messages"
          currentPath={currentPath}
          collapsed={collapsed}
        />
        <NavItem
          icon={CompassIcon}
          label="Discover"
          to="/discover"
          currentPath={currentPath}
          collapsed={collapsed}
        />
        <NavItem
          icon={BellIcon}
          label="Notifications"
          to="/notifications"
          currentPath={currentPath}
          collapsed={collapsed}
        />

        <div className="my-4 border-t border-white/5 mx-2" />

        <NavItem
          icon={SettingsIcon}
          label="Settings"
          to="/settings"
          currentPath={currentPath}
          collapsed={collapsed}
        />
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-white/5 mt-auto">
        <div
          className={`dropdown dropdown-top w-full ${collapsed ? "dropdown-end" : ""}`}
        >
          <div
            tabIndex={0}
            role="button"
            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors w-full ${collapsed ? "justify-center" : "justify-start"}`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                <img
                  src={
                    authUser?.profilePic ||
                    "https://ui-avatars.com/api/?name=User&background=6366F1&color=fff"
                  }
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-success rounded-full border-2 border-surface"></div>
            </div>
            {!collapsed && (
              <div className="flex-1 text-left overflow-hidden">
                <p className="font-semibold text-sm text-textPrimary truncate">
                  {authUser?.fullName || "User"}
                </p>
                <p className="text-xs text-textSecondary font-medium">Online</p>
              </div>
            )}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[100] menu p-2 shadow-2xl bg-surface-light border border-white/10 rounded-box w-52 mb-2"
          >
            <li>
              <a className="text-textPrimary hover:bg-white/5">
                <SettingsIcon size={16} /> Profile settings
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-error hover:bg-error/10"
              >
                <LogOutIcon size={16} /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ icon: Icon, label, to, currentPath, collapsed }) => {
  const isActive =
    currentPath === to || (to !== "/" && currentPath.startsWith(to));
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                ${
                  isActive
                    ? "bg-gradient-to-r from-primary/15 to-transparent text-primary"
                    : "text-textSecondary hover:text-textPrimary hover:bg-white/5"
                }
                ${collapsed ? "justify-center" : "justify-start"}
            `}
    >
      {isActive && !collapsed && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
      )}
      <Icon
        className={`w-5 h-5 ${isActive ? "text-primary" : "text-textSecondary group-hover:text-textPrimary"} transition-colors`}
      />
      {!collapsed && <span className="font-medium text-sm">{label}</span>}

      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-surface-light border border-white/10 rounded-md text-xs text-textPrimary opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </Link>
  );
};

export default Sidebar;
