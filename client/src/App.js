import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Home from "./home/Home";
import Favorite from "./favorit/Favorite";
import About from "./about/About";
import Login from "./login/Login";
import Search from "./search/Search";
import SearchGame from "./search/SearchGame";
import NavigationBar from "./navbar/NavigationBar";
import Footer from "./footer/Footer";
import SignUp from "./signup/SignUp";
import Logout from "./logout/Logout";
import GamePage from "./gamePage/GamePage";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      searchState: [],
      favorites: []
    };
  }

  setSearchState = data => {
    this.setState({ searchState: data });
  };

  setUser = user => {
    this.setState({ user: user });
    if (user === null) {
      localStorage.clear();
    }
  };

  componentDidMount() {
    axios.get("/");
  }

  render() {
    return (
      <>
        <Router>
          <NavigationBar
            loggedIn={this.state.user}
            setSearchState={this.setSearchState}
          />
          <Switch>
            <Route exact
             path="/" 
             component={Home}
            />
            <Route exact 
            path="/about/About"
             component={About} 
            />
            <Route
            exact path="/user/Favorit" 
            component={Favorite} 
            />
            <Route 
            path="/game/:id" 
            exact component={GamePage}
             />
            <Route
              path="/SearchGame"
              exact
              render={() => <SearchGame games={this.state.searchState} />}
            />
            <Route
              path="/search/genre/:genre"
              exact
              render={routeParms => <Search {...routeParms} />}
            />
            <Route
              exact
              path="/login/Login"
              render={() => <Login setUser={this.setUser} />}
            />
            <Route
              exact
              path="/signup/SignUp"
              render={() => <SignUp setUser={this.setUser} />}
            />
            <Route
              exact
              path="/logout/Logout"
              render={() => <Logout setUser={this.setUser} />}
            />
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}
