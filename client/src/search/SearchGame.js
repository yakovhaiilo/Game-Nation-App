import React, { Component } from 'react'
import Searchitem from "./SearchItem";
import { Row, Col } from "reactstrap";
import './SearchGame.css'

export default class SearchGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            games : this.props.suggestions
        }

    }
    
  checkDataGame(gameArray) {
    if (gameArray) {
      return (
        <Row>
          {gameArray.map((game, i) => (
            <Col md="3" key={i}>
              <Searchitem
                id={game.id}
                title={game.name}
                img={game.background_image}
                // game = {game.id,game.name,game.background_image}
              />
            </Col>
          ))}
        </Row>
      );
    } else {
      this.isloading = true;
    }
  }


    render() {
         
          
    
        return (
            <div className ="SearchGame" >  
            <div className = "favorite" >
              {this.props.games.length > 0 ?   <div>{this.checkDataGame(this.props.games)}</div>  : 
                 <div className = "massage">
                   <span>No Results </span> <i className="fas fa-surprise"></i>
                   </div>
                 }
            </div>
                
               
            </div>
        )
    }
}
