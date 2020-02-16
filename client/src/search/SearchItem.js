import React, { Component } from "react";
import "./SearchItem.css"
import { Link } from "react-router-dom";
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";
  
export default class SearchItem extends Component {
    

  addToFavorit = () => {
    if(localStorage.length >= 2){
      axios.post(`http://localhost:3000/user/favorite`, {  
        email: localStorage.email,
        name: this.props.title,
        img : this.props.img
       })
          .then(res => {
             if(res.status === 201){
               console.log("user coonectd")
             }      
        })

    }else{
      console.log("you must to login to add a game ")
    }
      
  }


  render() {
    
    return (
      <div className ="SearchItem">
          
          <Card className = "SearchItem-Card">
            <CardImg
              src={this.props.img}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle className = "SearchItem-title">{this.props.title}</CardTitle>
              <Link to={`/game/${this.props.id}`}>ReadMore...</Link>
            </CardBody>
            {localStorage.length >= 2 ?  (
                   <div className =  "favorite">
                   <i onClick ={this.addToFavorit} className="fas fa-heart"></i>
                   </div>
                 
             ):
               ""
             }   
        
          </Card>
          
    
      </div>
    );
  }
}
