import React, { Component } from "react";
import axios from "axios";
import "./gamePage.css";
import { Container } from "reactstrap";

export default class GamePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag : false,
      game: {},
      isloading : true
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios.get(`https://api.rawg.io/api/games/${id}`).then(res => {
      const game = res.data;
      this.setState({ game , isloading : false  , flag : true});
  
    });

  }

  render() {
    const game = this.state.game;

    return (
      <div className="GamePage">
        
        {this.state.isloading ? (
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
          <>
          <img
          className="GamePage-cover-background"
          src={game.background_image_additional}
          alt={game.name}
        />
        <Container fluid="lg">
          <div className="GamePage-info">
            <div className="game2">
              <div className="GamePage-left">
                <img
                  className="GamePage-img"
                  src={game.background_image}
                  alt={game.name}
                ></img>

                {this.state.flag && (
                  <div className="GamePage-platform">
                    <h5>platforms :</h5>
                    {game.platforms.map((platform, i) => (
                      <p className="platform" key={i}>
                        {platform.platform.name} ,{" "}
                      </p>
                    ))}
                    <p>
                      <a href={game.website}>official website</a>
                    </p>
                  </div>
                )}
              </div>

              <div className="GamePage-right">
                <h1>{game.name}</h1>
                <h3>{game.released}</h3>
                {this.state.flag &&
                  game.genres.map((ganre, i) => (
                    <span key={i} className="GamePage-ganre">
                      {ganre.name}
                    </span>
                  ))}
                <h3>sumary :</h3>
                <p className="GamePage-Summary">{game.description_raw}</p>

                {this.state.flag &&  game.clip !== null &&  
                <div>
                  <h3>clip :</h3>
                  <video controls width="100%" height="300px">
                    <source src = {game.clip.clip || game.clip.clips.full} type="video/mp4" />
                    <source src = {game.clip.clip || game.clip.clips.full} type="video/webm" />
                    <source src = {game.clip.clip || game.clip.clips.full} type="video/ogg" />
                  </video>
                </div>
                }
              </div>
            </div>
          </div>
        </Container>
        </>
          
        )}
     
      </div>
    );
  }
}
