import React, { Component } from "react";
import NavBar from "./component/NavBar";
import Register from "./component/Register";
import Login from "./component/Login";
import Home from "./component/Home";
import Projects from "./component/Projects";
import Guide from "./component/Guide";
import Contact from "./component/Contact";
import ProfileDetail from "./component/ProfileDetail";
import Upload from "./component/Upload";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  state = {
    activeItem: "home"
  };

  handleItemClick = () => {
    console.log("Link clicked : ");
    this.setState({ activeItem: "home" });
  };
  render() {
    return (
      <Router>
        <div>
          <NavBar
            activeItem={this.state.activeItem}
            handleActive={this.handleItemClick}
          />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/projects" component={Projects} />
            <Route path="/guide" component={Guide} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile/:id" component={ProfileDetail} />
            <Route path="/upload" component={Upload} />
          </Switch>
        </div>
      </Router>
    );
  }
}
