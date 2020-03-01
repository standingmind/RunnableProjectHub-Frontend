import React from "react";
import { Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

function NavBar() {
  return (
    <div>
      <div className="header">
        <Header
          as={Link}
          image={logo}
          content="Runnable Project Hub"
          to="/home"
          textAlign="left"
        />
      </div>

      <div className="topnav">
        <Link to="/home">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/guide">Guide</Link>
        <Link to="/contact">Contact</Link>

        <Button
          primary
          as={Link}
          to="/register"
          style={{ float: "right", margin: "10px" }}
        >
          Register
        </Button>
        <Button
          as={Link}
          to="/login"
          style={{ float: "right", margin: "10px" }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
