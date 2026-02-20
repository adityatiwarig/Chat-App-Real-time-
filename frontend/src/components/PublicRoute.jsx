import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { authUser, isAuthLoading } = useSelector((store) => store.user);

  if (isAuthLoading) {
    return <div className="text-white">Checking session...</div>;
  }

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
