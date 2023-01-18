import React  from 'react';
import './signup.css';

require('dotenv').config();


function Signup ({obj}) {

    var username = ' ';
    var email = ' ';
    var password = ' ';

    const usernameTyped = (event) => {
        username = event.target.value;
    } 

    const emailTyped = (event) => {
        email = event.target.value;
    }

    const passwordTyped = (event) => {
        password = event.target.value;
    }


    async function submitButton(event)  {
        if (username === ' ' || password === ' ' || email === ' ')
            return;
        try {
            event.preventDefault();
            await fetch("http://localhost:3000/signup", {
                method: 'POST',
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username : username,
                    email : email,
                    password : password
                })
            })
            .then(res=> res.json())
            .then((res)=>{
                console.log(res);
                if (res.success === true){
                    console.log(res);
                    obj.changeRoute('login');
                }
            })
        }
        catch (e){
            console.log("Error occured at sign up page ", e);
        }

    }

    if (obj.page === 'signup'){

        return(
            <div className="login">
            
            <h2>Signup</h2>
            <h3>Secure your password</h3>

            <form className="login-form">
                <div className="textbox">
                    <input type="email" onChange={emailTyped}  placeholder="Email" />
                    <span className="material-symbols-outlined"> email </span>
                </div>

                <div className="textbox">
                    <input onChange ={usernameTyped} type="text" placeholder="Username" />
                    <span className="material-symbols-outlined">  account_circle</span>
                </div>

                <div className="textbox">
                    <input type="password" onChange={passwordTyped} placeholder="Password" />
                    <span className="material-symbols-outlined"> lock </span>
                </div>
                
                
                <button type="submit" onClick={submitButton}>SIGNUP</button>

                <a onClick={()=> obj.changeRoute('login')}> Login instead? </a>
            </form>
        </div>
        );
    }
}

export default Signup;