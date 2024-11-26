import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Common header */}
      <Header/>
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
