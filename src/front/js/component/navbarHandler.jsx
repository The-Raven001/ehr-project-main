import React from "react";
import { useLocation } from "react-router-dom";
import { UserNavbar } from "./userNavbar.jsx";
import { WelcomeNavbar } from "./welcomeNavbar.jsx";

export const NavbarHandler = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  const notLoggedIn = path === "/" || path === "/login" || path === "/signup";

  return (
    <>
      {notLoggedIn ? <WelcomeNavbar /> : <UserNavbar />}
      <main>{children}</main>
    </>
  );
};
