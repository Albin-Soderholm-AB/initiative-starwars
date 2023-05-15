import React, { useState } from "react";

// ICONS
import * as FaIcons from "react-icons/fa"; //Now i get access to all the icons
import * as AiIcons from "react-icons/ai";

import { IconContext } from "react-icons";

// ROUTING

import { Link } from "react-router-dom";

// DATA FILE
import { SidebarData } from "./SlidebarData";

import { saveState } from "../api/api";

import { Nav, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { InteractionStatus } from "@azure/msal-browser"; 
import { loginRequest, b2cPolicies } from '../authConfig';

// STYLES
import "./Navbar.css";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const { instance, inProgress } = useMsal();
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

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
  };

  const handleLogoutPopup = () => {
    instance.logoutPopup({
      mainWindowRedirectUri: '/', // redirects the top level app after logout
    });
  };

  const handleProfileEdit = () => {
    if (inProgress === InteractionStatus.None) {
      instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile);
    }
  };

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
            <li key={-1} className="nav-text">
              <button onClick={() => saveState({}).then(() => window.location.reload())}>
                {<AiIcons.AiOutlineClear />}
                <span>Clear</span>
              </button>
            </li>
            <AuthenticatedTemplate>
              <Nav.Link className="navbarButton" href="/todolist">
                Todolist
              </Nav.Link>
              <div className="collapse navbar-collapse justify-content-end">
                <Button variant="info" onClick={handleProfileEdit} className="profileButton">
                  Edit Profile
                </Button>

                <DropdownButton
                  variant="warning"
                  drop="start"
                  title={activeAccount && activeAccount.username ? activeAccount.username : 'Unknown'}
                >
                  <Dropdown.Item as="button" onClick={handleLogoutPopup}>
                    Sign out using Popup
                  </Dropdown.Item>
                  <Dropdown.Item as="button" onClick={handleLogoutRedirect}>
                    Sign out using Redirect
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <div className="collapse navbar-collapse justify-content-end">
                <DropdownButton variant="secondary" className="ml-auto" drop="start" title="Sign In">
                  <Dropdown.Item as="button" onClick={handleLoginPopup}>
                    Sign in using Popup
                  </Dropdown.Item>
                  <Dropdown.Item as="button" onClick={handleLoginRedirect}>
                    Sign in using Redirect
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </UnauthenticatedTemplate>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};