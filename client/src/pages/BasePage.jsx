import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BasePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const nagivate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (!isAuthenticated) {
      if (pathname !== "/login" && pathname !== "/signup") nagivate("/login");
    } else {
      if (pathname === "/login" || pathname === "/signup") nagivate("/");
    }
  }, [isAuthenticated]);
  return <Outlet />;
};

export default BasePage;
