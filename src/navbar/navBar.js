import React, { useEffect, useState } from "react";

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";

import { IconContext } from "react-icons";

// ROUTING

import { Link } from "react-router-dom";

// DATA FILE
import { SidebarData } from "./SlidebarData";

import { saveState } from "../api/api";

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

// STYLES
import "./Navbar.css";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { instance } = useMsal();
  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  const handleLoginPopup = () => {
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: '/redirect',
      })
      .catch((error) => console.log(error));
  };

  const handleLogoutPopup = () => {
    instance.logoutPopup({
      mainWindowRedirectUri: '/', // redirects the top level app after logout
    });
  };

  useEffect(() => {
    console.log("Active account: ", activeAccount);
  }, [activeAccount]);

  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        {/* All the icons now are white */}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <AuthenticatedTemplate>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <a href={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            })}
            </AuthenticatedTemplate>
            <AuthenticatedTemplate>
              <li key={-1} className="nav-text">
                <button onClick={() => saveState({}).then(() => window.location.reload())}>
                  {<AiIcons.AiOutlineClear />}
                  <span>Clear</span>
                </button>
              </li>
            </AuthenticatedTemplate>
            <AuthenticatedTemplate>
              <div className="nav-text">
                <button onClick={handleLogoutPopup}>
                  <span>Sign out</span>
                </button>
              </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <div className="nav-text">
                <button onClick={handleLoginPopup}>
                  <span>Sign in</span>
                </button>
              </div>
            </UnauthenticatedTemplate>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};