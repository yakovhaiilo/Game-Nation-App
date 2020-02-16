import React, { Component } from "react";
import "./gameCard.css";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

export default class GameCard extends Component {
  render() {
    return (
      <div className="GameCard" key={this.props.id}>
    
          <Card className = "GameCard-Card">
            <CardImg
              src={this.props.img}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle className = "GameCard-title">{this.props.title}</CardTitle>
              <Link to={`/game/${this.props.id}`}>ReadMore...</Link>
      
            </CardBody>
          </Card>
          
      </div>
    );
  }
}
