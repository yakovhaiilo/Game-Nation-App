import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import GameCard from "../gameCard/GameCard";
import "./home.css";
import "../_shared/Loader.css"

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.isloading = true;
    this._isMounted = false;
    this.state = {
      popularGames: [],
      recentGames: []
    };
    this.checkdata = this.checkDataGame.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.isloading = false;
    const resRecent = axios.get("https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added&page_size=8" );
    const resPopular = axios.get( "https://api.rawg.io/api/games?ordering=-reting&page_size=8");
    axios.all([resRecent, resPopular]).then(
        axios.spread((...responses) => {   
          if (this._isMounted) {
            this.setState({
              popularGames: responses[0].data.results,
              recentGames: responses[1].data.results
            });
          }
        })
      )
      .catch(err => {
        console.log(err);
      });
  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  checkDataGame(gameArray) {
    if (gameArray) {
      return (
        <Row>
          {gameArray.map((game, i) => (
            <Col md="3" key={i}>
              <GameCard
                id={game.id}
                title={game.name}
                img={game.background_image}
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
      <div className="Home">
        <div className="HomeBg"> </div>

        {this.isloading ? (
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <Container fluid="s">
            <h1 className="title">Popular GAMES</h1>
            {this.checkDataGame(this.state.popularGames)}
            <h1 className="title">Recent GAMES</h1>
            {this.checkDataGame(this.state.recentGames)}
          </Container>
        )}
      </div>
    );
  }
}
