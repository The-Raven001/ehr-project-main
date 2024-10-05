import React, { useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Context } from "../store/appContext";

export const AuthWrapper = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      navigate("/login");
    }
    actions.getUser();
  }, []);

  return <Outlet />;
};
