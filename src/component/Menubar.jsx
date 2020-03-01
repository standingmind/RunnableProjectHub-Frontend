import React, { Component } from "react";
import { Menu, Button, Image, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "./logo.png";

export default class Menubar extends Component {
  render() {
    return (
      <React.Fragment>
        <Header
          as={Link}
          image={logo}
          content="Runnable Project Hub"
          to="/home"
          textAlign="left"
        />
        <Menu inverted pointing>
          <Menu.Menu position="left">
            <Menu.Item name="home" as={Link} to="/home" />

            <Menu.Item name="projects" as={Link} to="/projects" />

            <Menu.Item name="guides" as={Link} to="/guide" />

            <Menu.Item name="contact" as={Link} to="/contact" />
          </Menu.Menu>

          <Menu.Menu position="right">
            <Menu.Item>
              <Button name="login" as={Link} to="/login">
                Login
              </Button>

              <span class="divider"> </span>
              <Button primary name="signup" as={Link} to="/signup">
                Signup
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </React.Fragment>
    );
  }
}
