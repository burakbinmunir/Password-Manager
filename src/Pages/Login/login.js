import React  from 'react';
import './login.css'

function Login({obj}){

    var username =  ' ';
    var password = ' ';
    var currentUser = null;

    const passwordTyped = (event) => {
        password = event.target.value;
    }
    
    const usernameTyped = (event) => {
        username = event.target.value;
    }

    async function loginButtonClicked(event)  {
        if (username == ' ' || password == ' ')
            return;
        
        try {
            event.preventDefault();
            await fetch("http://localhost:3000/login", {
                method: 'POST',
                headers : {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username : username,
                    password : password
                })
            })
            .then(async res=> await res.json())
            .then((res)=>{
               if (res != null){
                    if (res.user.username == username && res.user.password == password){
                        currentUser = res.user;
                        obj.setCurrentUser(currentUser)
                        obj.changeRoute('signup');
                    }
               }
            })
        }
        catch (e){
                console.log("Error occured at sign up page ", e);
        }

    }

    if (obj.page === 'login') {
        
        return (
            <div className="login">
                <h2>Login</h2>
                
                <h3>Secure your password</h3>
                
                <form className="login-form">
                    <div className="textbox">
                        <input onChange={usernameTyped} type="text" placeholder="Username" />
                        <span className="material-symbols-outlined"> account_circle </span>
                    </div>
                    
                    <div className="textbox">
                        <input onChange={passwordTyped} type="password" placeholder="Password" />
                        <span className="material-symbols-outlined"> lock </span>
                    </div>
                    
                    <button type="submit" onClick={loginButtonClicked}>
                            LOGIN 
                    </button>   
                    <a onClick={()=>obj.changeRoute('signup')}>Signup instead?</a>             
                </form>
            </div>
            
        );
    } 
}
export default Login;