import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loader></Loader>;
  }
  if (!user) {
    return <Navigate to="/login" state={location?.pathname} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
