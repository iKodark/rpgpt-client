import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { Storage } from "@/services";

import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();

  const token = Storage.getAccessToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      Dashboard
      <Button onClick={() => navigate("users")}>GO TO USERS</Button>
      <Button onClick={() => navigate("")}>GO TO HOME</Button>
      <Outlet />
    </>
  )
}

export default Dashboard;