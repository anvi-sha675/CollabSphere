import React from "react";
import AppSidebar from "./AppSidebar";
import AppNavbar from "./AppNavbar";

const Layout = ({ children, showSidebar = true }) => {
  return (
    <div className="min-h-screen bg-background flex w-full">
      {showSidebar && <AppSidebar />}
      <div className="flex-1 flex flex-col min-w-0">
        <AppNavbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
