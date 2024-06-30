import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Margin } from "@mui/icons-material";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const user = useSelector((state) => state.user);

  return user ? (
    <Component style={{ padding: "0", margin: "0" }} {...rest} />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
