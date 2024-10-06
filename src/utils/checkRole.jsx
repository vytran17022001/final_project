import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const CheckRole = (props) => {
  return props.isAdmin ? <Outlet /> : <Navigate to={"/"} replace />;
};
