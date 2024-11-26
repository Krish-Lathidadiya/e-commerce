import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left content */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-black text-white">
        <div className="p-2">
          <h2 className="text-5xl font-bold">Welcome to our website.</h2>
        </div>
      </div>

      {/* Right side content */}
      <div className="flex flex-1 items-center justify-center bg-white/50">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
