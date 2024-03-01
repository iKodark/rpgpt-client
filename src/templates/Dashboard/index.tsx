import { Outlet, Navigate } from "react-router-dom";
import { Storage } from "@/services";

import { Sidebar, Header } from "./components";

const Dashboard = () => {
  const token = Storage.getAccessToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header />
        <div className="m-5">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;