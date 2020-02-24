import React, { Component } from "react";
import axios from "axios";
import Searchitem from "./SearchItem";
import { Row, Col ,Container} from "reactstrap";
import "./SearchResult.css";
import "../_shared/Loader.css"

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.isloading = true;
    this.state = {
      genreResult: [],
      page: 1
    };
  }

  componentDidMount() {
    this.isloading = false;
    axios
      .get(
        `https://api.rawg.io/api/games?genres=${this.props.genre()}&page=${
          this.state.page 
        }&ordering=-reting`
      )
      .then(res => {
        this.setState({ genreResult: res.data.results });
      });
  }

  nextPage = () => {
    const limitPage = 20;
    if (this.state.page < limitPage) {
      this.setState({ page: this.state.page + 1 });
    }
  };
  prevPage = () => {
    const startPage = 1;
    if (this.state.page > startPage) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    this.isloading = false;
    if (prevState.page !== this.state.page) {
      axios
        .get(
          `https://api.rawg.io/api/games?genres=${this.props.genre()}&page=${
            this.state.page
          }&ordering=-reting`
        )
        .then(res => {
          this.setState({ genreResult: res.data.results });
          this.isloading = true;
        });
    }

    if (prevProps.genreId !== this.props.genreId) {
      this.isloading = false;
      axios
        .get(
          `https://api.rawg.io/api/games?genres=${this.props.genre()}&page=${
            this.state.page
          }&ordering=-reting`
        )
        .then(res => {
          this.setState({ genreResult: res.data.results, page: 1 });
          this.isloading = true;
        });
    }
  }

  checkDataGame(result) {
    if (result) {
      return (
        <Row>
          {result.map((game, i) => (
            <Col md="3" key={i}>
              <Searchitem
                id={game.id}
                title={game.name}
                img={game.background_image}
                game = {{id: game.id, img : game.background_image, title: game.name}}
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
      <div className="SearchResult">
      
        <Container>
        <div className = "hand-point">
        <i onClick={this.prevPage} className="fas fa-hand-point-left"></i>
        <i onClick={this.nextPage} className="far fa-hand-point-right" ></i>
         </div> 
        </Container>
         
       
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
        
          <div>{this.checkDataGame(this.state.genreResult)}</div>
        )}
      </div>
    );
  }
}

