import React, { Component } from "react";
import SearchResult from "./SearchResult";
import SportsLogo from "../images/bg12.jpg";
import "./Search.css";

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

  genre = () => {
    let genre = this.props.match.params.genre;
    let tempGenre;
    switch (genre) {
      case "Action":
        tempGenre = gamesId.action;
        break;
      case "Racing":
        tempGenre = gamesId.racing;
        break;
      case "Sports":
        tempGenre = gamesId.sports;
        break;
      default:
        break;
    }
    console.log(tempGenre);
    return tempGenre;
  };

  render() {
    let background;
    switch (this.state.title) {
      case "Action":
        background = "https://cdn.suwalls.com/wallpapers/games/prophet-in-crysis-2-54617-1920x1200.jpg";
        break;
      case "Sports":
        background = "https://1.bp.blogspot.com/-QiXw_PtTxUI/XVt_B2Pc0gI/AAAAAAAAWnQ/UHiyDGPEVeMslz4GFIJ2py_y_Nb3yetuACLcBGAs/s2560/1031827-1440.jpg";
        break;
      case "Racing":
        background = "https://www.wallpaperflare.com/static/105/445/194/need-for-speed-no-limits-video-games-night-city-wallpaper.jpg";
        break;
    }
   
    return (
      <div className="Search">
        <div className = "headerContainer">
          <img className="pageBackground" src = {background}></img>
          <div className = "pageTitle">
             <h1> GN {this.state.title} GAMES </h1>
           
          </div>
         
        
        </div>
        <SearchResult genre={this.genre} />
      </div>
    );
  }
}
