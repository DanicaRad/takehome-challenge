import React, {useContext} from "react";
import UserContext from "../Users/UserContext";
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";
import "./Navigation.css";

function Navigation({logout}) {
  const { currUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <Nav className="me-auto">
        { currUser.isAdmin && 
          <NavItem>
            <NavLink className="nav-item" href="/admin">Admin</NavLink>
        </NavItem>
        }
        <NavItem>
          <NavLink href="/profile">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/" onClick={logout}>Logout</NavLink>
        </NavItem>
      </Nav>
    );
  };

  function loggedOutNav() {
    return (
      <Nav className="me-auto">
        <NavItem>
          <NavLink href="/register">Register</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      </Nav>
    )
  }

  return (
    <>
      <Navbar className="navbar navbar-nav sticky-top navbar-expand-lg navbar-dark bg-dark">
          <NavbarBrand href="/">Yodlr</NavbarBrand>
            { currUser ? loggedInNav() : loggedOutNav() }
      </Navbar>
    </>
  );
};

export default Navigation;

