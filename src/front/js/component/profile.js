import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Profile = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    actions.logout();
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/protected/edit-profile");
  };

  const handleSearch = () => {
    navigate("/protected/search");
  };

  const handleCreateChart = () => {
    navigate("/protected/create-chart");
  };

  return (
    <div className="d-flex justify-content-center ">
      <div className="bg-light d-flex justify-content-center align-items-center flex-column mt-5 maindiv w-25">
        <h1>Welcome!</h1>
        <div className="d-flex mb-3">
          <button
            className="btn btn-dark profileButton me-2"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          <button
            className="btn btn-dark profileButton me-2"
            onClick={handleCreateChart}
          >
            Create Chart
          </button>
          <button className="btn btn-dark profileButton" onClick={handleSearch}>
            Search Chart
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="btn btn-dark me-2 mb-3 profileButton"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
