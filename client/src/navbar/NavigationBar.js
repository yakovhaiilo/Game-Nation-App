import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigationBar.css";
import axios from "axios";

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToSearchGame: false,
      query: "",
      suggestions: []
    };
  }

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  searchQuery = e => {
    e.preventDefault();
    const name = this.state.query;
    if (!name || name.length < 3 || name === "") {
      this.setState({ suggestions: [] });
    } else {
      axios.get(`https://api.rawg.io/api/games?search=${name}&ordering=-added`).then(res => {
        this.props.setSearchState(res.data.results);
        this.setState({ redirectToSearchGame: true });
      });
    }
  };

  render() {
    return (

<Navbar className = "NavigationBar" bg="light" expand="lg">
  <Navbar.Brand className = "NavigationBar-logo" href="/">Game-Nation</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  
    <Nav className="mr-auto">
      <Link to="/"><i className="fas fa-home"></i> Home</Link>
      <Link to="/about/About"><i className="fas fa-address-card"></i> About</Link>
      
      <NavDropdown  title="Geners" id="collasible-nav-dropdown">
  
        <NavDropdown.Item href="/search/genre/Action">
        Action
        </NavDropdown.Item>
      
        <NavDropdown.Item href="/search/genre/Racing">
        Racing
        </NavDropdown.Item>
        <NavDropdown.Item  href="/search/genre/Sports">
        Sports
        </NavDropdown.Item>
      </NavDropdown>
      {localStorage.length >= 2 ?  (
      <Nav>
        
        <Link to="/user/Favorit"><i className="fas fa-heart"></i> MyFavorites</Link>
        <Link to="/logout/LogOut"><i className="fas fa-sign-out-alt"></i> LogOut</Link>
      </Nav>
    ):<Nav>
        <Link to="/login/Login"> <i className="fas fa-sign-in-alt"></i> Login</Link>
      </Nav>
  }   
    </Nav>
    <Form>
      <FormControl type="text"
       placeholder="Search" 
       className="mr-sm-2" 
       onChange = {this.handleChange}
       
       />
      <Button 
      variant="inline-success"
      onClick={this.searchQuery}
      >
      <Link className="text-white" to="/SearchGame"> <i className="fab fa-searchengin"></i> Search</Link>
      </Button>
    </Form>
    
  </Navbar.Collapse>
</Navbar>
 

    );
  }
}
