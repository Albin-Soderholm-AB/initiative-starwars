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

  const { instance, accounts, inProgress } = useMsal();
  let activeAccount;
  const [token, setToken] = useState(null);

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  const handleLoginPopup = () => {
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: '/redirect',
      })
      .then((response) => {
        console.log("Response:");
        console.log(response.accessToken);
        setToken(response.accessToken);
      })
      .catch((error) => console.log(error));
  };

  const handleLogoutPopup = () => {
    instance.logoutPopup({
      mainWindowRedirectUri: '/', // redirects the top level app after logout
    });
  };



  useEffect(() => {
    if (inProgress === 'none' && accounts.length > 0) {
      const request = {
        account: accounts[0],
        scopes: ["User.Read"]
      };
      // Retrieve an access token
      instance.acquireTokenSilent(request)
        .then(response => {
          console.log('response', response);
          if (response.accessToken) {
            console.log('accessToken', response.accessToken);
            setToken(response.accessToken);
            return response.accessToken;
          }
          return null;
        })
        .catch(error => console.log('token error', error));
    }
  }, [inProgress, accounts, instance]);

  useEffect(() => {
    console.log("Active account: ", activeAccount);
    console.log("Token: ", token);
  }, [activeAccount, token]);

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