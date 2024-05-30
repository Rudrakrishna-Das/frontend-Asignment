import { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user } = useContext(UserContext);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
