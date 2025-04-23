import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserNavbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between">
        <div>
          <Link to="/">
            <button className="btn btn-dark px-5 saveButton">
              Edit Profile
            </button>
          </Link>
        </div>
        <div className="ml-auto">
          <Link to="/login">
            <button className="btn btn-dark px-5 saveButton me-3">
              Create Chart
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-dark px-5 saveButton">Logout</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
