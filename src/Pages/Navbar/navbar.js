import React from "react";
import 'react-bootstrap/Card';

function Navbar ({obj}){
    
    if (obj.page === 'loggedin' || obj.page === 'updated') {
        return (
            <nav class="navbar bg-body-tertiary" style={{width: 1000}}>
                <div class="container-fluid">
                    <a class="navbar-brand">Password Manager</a>
                    <form class="d-flex" role="search">
                    {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input> */}
                    <button class="btn btn-outline-success" type="submit" onClick={()=> obj.changeRoute('login')}>Signout</button>
                    &nbsp;
                    <button class="btn btn-outline-success"  onClick={()=> obj.changeRoute('newpassword')}>Add new password</button>
                    </form>
                </div>
            </nav>
        );
    } 
}

export default Navbar;