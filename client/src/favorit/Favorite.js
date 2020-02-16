import React, { Component } from "react";
import {Container} from "reactstrap";
import axios from "axios";
import FavoriteItem from "./FavoriteItem";
import "./Favorite.css";

export default class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      favorites: []
    };
  }

  componentDidMount() {
    let email = localStorage.email;
    axios
      .get(`http://localhost:3000/user/favorite/${email}`)
      .then(res => {
        if (res.status === 200) {
          this.setState({ favorites: res.data, flag: true });
        }
      })
      .catch(err => {
        console.log(err, "cetch");
      });
  }

  removeFavorite = (data) =>{

    axios.delete(`http://localhost:3000/user/favorite/${data}`)
      .then(res => {
        if (res.status === 200) {
          let index = this.state.favorites.findIndex( x => x._id === data)
          let newFav = this.state.favorites;
          newFav.splice(index, 1);
          this.setState({favorites:newFav});
      }   
    })
          
  }

  createFavoriteCard = array => {
    if (this.state.flag) {
      return (
        <div>
          {array.map((game, i) => (
            <FavoriteItem key = {i} img={game.img} title = {game.name} id = {game._id} removeFavorite = {this.removeFavorite}  />
          ))}
        </div>
      );
    }
  };

  render() {
    
    return (
      <div className="Favorite">
        <div className="Favorite-Header">
          <Container>
          <h1 className = "page-title"> Favorites </h1>
          </Container>
        
        </div>
        <Container>
        <div className="Favorite-games">
          {this.state.favorites.length === 0 && <p className = "no-items">You have no Favorites...</p>  } 
          {this.state.flag && this.createFavoriteCard(this.state.favorites)}
        </div>

        </Container>
        
      </div>
    );
  }
}
