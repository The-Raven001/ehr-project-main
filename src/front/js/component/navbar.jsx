import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/*const [currentPath, setCurrentPath] = useState("/");
//const location = useLocation();

 useEffect(() => {
  setCurrentPath(location.pathname);
}, [location]); 
*/

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-between">
        <div>
          <Link to="/">
            <button className="btn btn-dark px-5 saveButton">
              Back to home
            </button>
          </Link>
        </div>
        <div className="ml-auto">
          <Link to="/login">
            <button className="btn btn-dark px-5 saveButton me-3">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button className="btn btn-dark px-5 saveButton">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
