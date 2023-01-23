import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './card.css'
import { useState } from "react";
import 'bootstrap'



function returnCard (obj){
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <span>
    <br></br>
    <Card style={{width:  '18rem' , backgroundColor:'black'}}>
      {/* <Card.Img variant="top" src="https://logodix.com/logo/14581.jpg"/>   */}
      <Card.Body >
        <Card.Title >{obj.applicationName}</Card.Title>
        <label>Username</label>
        <input placeholder='' value={obj.username} readOnly></input>
        <br></br>
        <label> Password</label>
        <input id='password' value={obj.password} type={passwordShown ? "text" : "password"} ></input>
        <span></span>
        <span></span>
        <Button onClick={togglePassword} style={{height: 29}} class="btn btn-outline-success" ><i style={{display: 'block', margin: 'auto',color: 'black'}} id="togglePassword" class="fa fa-eye-slash"> </i></Button>
        <br></br>
        <br></br>
        {/* <Button variant="primary" >Edit</Button> */}
      </Card.Body>
    </Card>
    </span>    
  );
}

function SavedPassword ({obj}) {
  var i =0;
  var arr = [];
  while (i < obj.passwords.length){
    if (obj.passwords[i].username != 'demo')
      arr.push(returnCard(obj.passwords[i]));
    i++;
  }

  i=0;
  if (obj.page === 'loggedin'){
   while(i< obj.passwords.length){
      return(arr);
      i++;
    };
     
  }
}

export default SavedPassword;