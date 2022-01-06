import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import accountService from "../services/account";

export const ProtectedRoute = () => {
  const user = accountService.getUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/account/edit");
    }
  }, [user, navigate]);

  return <Outlet />;
};
