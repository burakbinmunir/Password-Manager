import React from "react";


function NewPassword ({obj}) {
    var appUserName = ' ';
    var appPassword = ' ';
    var applicationName = 'Instagram';

    const usernameTyped = (event)=>{
        appUserName = event.target.value;
    }
    
    const passwordTyped = (event)=>{
        appPassword  = event.target.value;
    }

    const applicationChoosed = (event) => {
        applicationName = event.target.value;
    }

    const submitButtonClicked = (event) =>{
        event.preventDefault();
        fetch("http://localhost:3000/newpassword", {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
                 username:  obj.getCurrentUser().username,
                 applicationName: applicationName,
                 appUserName: appUserName,
                 appPassword: appPassword
             })
         })
         .then(async response => await response.json())
         .then ((response)=>{
            if (response.success === true){
                obj.getSavedPasswords(obj.getCurrentUser().username);
                 obj.changeRoute('loggedin');
            }
         })
     }

    if (obj.page === 'newpassword') {
        return (
            <div>
            <form>
                <h1>New Password</h1>
                <br></br>
                <br></br>

                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Username / Email</label>
                    <input type="text" class="form-control" onChange={usernameTyped} id="exampleInputEmail1" placeholder="Username / Email" aria-describedby="emailHelp"></input>
                </div>
             

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" onChange={passwordTyped} placeholder="Password" id="exampleInputPassword1"></input>
                </div>
            
                <div>
                    <label class="form-label" >Application</label>
                    <select style={{margin: 10}} onChange={applicationChoosed} type="dropdown"   id="colours">
                        <option value="Instagram">Instagram</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Facebook">Facebook</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary" onClick={submitButtonClicked}c>Submit</button>     
            </form>
            </div>
        );
    }
}

export default NewPassword;