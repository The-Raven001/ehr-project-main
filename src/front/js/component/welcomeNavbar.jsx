import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const WelcomeNavbar = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between">
        <div>
          <Link to="/">
            <button
              className={`btn btn-dark px-5 saveButton ${
                currentPath === "/" ? "active" : ""
              }`}
            >
              Back to home
            </button>
          </Link>
        </div>
        <div className="ml-auto">
          {currentPath !== "/login" && (
            <Link to="/login">
              <button
                className={`btn btn-dark px-5 saveButton me-3 ${
                  currentPath === "/login" ? "active" : ""
                }`}
              >
                Log in
              </button>
            </Link>
          )}
          {currentPath !== "/signup" && (
            <Link to="/signup">
              <button
                className={`btn btn-dark px-5 saveButton ${
                  currentPath === "/signup" ? "active" : ""
                }`}
              >
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
