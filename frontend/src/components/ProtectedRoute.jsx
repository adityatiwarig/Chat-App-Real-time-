import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { authUser, isAuthLoading } = useSelector((store) => store.user);
  const shouldRedirect = !isAuthLoading && !authUser;

  useEffect(() => {
    if (shouldRedirect) {
      toast.error("Please log in to continue.", { id: "auth-required" });
    }
  }, [shouldRedirect]);

  if (isAuthLoading) {
    return <div className="text-white">Checking session...</div>;
  }

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
