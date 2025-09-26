import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;