import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserNavbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-center">
        <Link to="/protected/edit-profile">
          <button className="btn btn-dark px-5 saveButton me-3">
            <i
              className="fa-solid fa-user me-2"
              styleName="color: #ffffff;"
            ></i>
            Edit Profile
          </button>
        </Link>
        <Link to="/protected/create-chart">
          <button className="btn btn-dark px-5 saveButton me-3">
            <i
              className="fa-solid fa-hospital-user me-2"
              styleName="color: #ffffff;"
            ></i>
            Create Chart
          </button>
        </Link>
        <Link to="/">
          <button className="btn btn-dark px-5 saveButton">
            <i
              className="fa-solid fa-arrow-right-from-bracket me-2"
              styleName="color: #ffffff;"
            ></i>
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
};
