import React, { Component } from 'react'
import { Row, Col } from "reactstrap";

export default class FavoriteItem extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
  
    remove = () =>{
        this.props.removeFavorite(this.props.id)
    }

    render() {
        return (
        
        <div className = "FavoriteItem">
             <Row>
                 <Col>
                 <img src = {this.props.img} alt = {this.props.title} ></img>
                 </Col>
                 <Col>
                 <span>{this.props.title}</span>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                 </Col>
                 <Col className = "delete-Container">
                 <i onClick = {this.remove}  className="fas fa-trash-alt"></i>
                 </Col>
             </Row>
 
        </div>
         
        )
    }
}
