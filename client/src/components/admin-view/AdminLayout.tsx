import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Admin side bar */}
      <Sidebar/>
      <div className="flex flex-1 flex-col">
        {/* Admin header */}
        <Header/>
        <main className="flex-1 flex bg-gray-100 p-4 md:p-6 rounded-tl-lg" >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
