import React, { Component } from "react";
import SearchResult from "./SearchResult";
import { Container } from "reactstrap";
import './Search.css'

const gamesId = {
  action: "4",
  racing: "1",
  sports: "15"
};

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: "",
      title: this.props.match.params.genre
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.genre !== this.props.match.params.genre) {
      this.setState({
        title: this.props.match.params.genre,
        genre: gamesId[this.props.match.params.genre]
      });
    }
  }




  genre = () => {
    let genre = this.props.match.params.genre;
    let tempGenre;
    switch (genre) {
      case "action":
        tempGenre = gamesId.action;
        break;
      case "racing":
        tempGenre = gamesId.racing;
        break;
      case "sports":
        tempGenre = gamesId.sports;
        break;
      default:
        break;
    }
    return tempGenre;
  };

  handleChange = (e) => {
    this.setState({query : e.target.value});
  }

  render() { 
    return (
      <div className = "Search">
        <Container>
          <h1 className = "pageTitle">{this.state.title}</h1>
        </Container>
      <div className="alert">
       <span className="closebtn">&times;</span> 
           <strong>Danger!</strong> Indicates a dangerous or potentially negative action.
       </div>
         
        <SearchResult
         genreId={this.state.genre} 
         genre={this.genre} 
         suggestions = {this.state.suggestions}
         
         />
      </div>
    );
  }
}
