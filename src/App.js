import React,{Component} from 'react';
import './App.css';
import Login from './Pages/Login/login';
import Signup from './Pages/Signup/signup';
import SavedPassword from './Pages/Cards/card';
import Navbar from './Pages/Navbar/navbar';
import NewPassword from './Pages/NewPassword/newpassword';

class App extends Component {
  
  currentUser = ' ';
  savedPasswords = [];
  constructor (){
    super();
    this.state = {
      route : 'login',
      passwordsLoaded: false,
    }
  }

  render () {
    const tempObj = {
      page: this.state.route,
      username: 'Burak',
      applicationName: 'Bumble',
      password: 'pass'
    }
    const clickObj = {
      page : this.state.route,

      changeRoute : ( newRoute ) => {
        this.setState({route : newRoute});
      },

      setCurrentUser : (cUser) => {
        this.currentUser = cUser;
      },

      getCurrentUser: ()=>{
        return this.currentUser;
      },

      getSavedPasswords : (username) =>{
        console.log(username)
        fetch("http://localhost:3000/loggedin", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: username
          })
        })
        .then (async response => await response.json())
        .then ((response )=>{
          if (response != null){
            this.savedPasswords = response.result.savedPasswords;
            this.setState({passwordsLoaded : true});
          }
        })
      }
  
    }

    const passObj = {
      page : this.state.route,
      passwordsLoaded: this.state.passwordsLoaded,
      passwords: this.savedPasswords
    }
  
    return (
      <div>
        <Login obj = {clickObj}/>
        <Signup obj = {clickObj}/> 
        <br></br>
        <Navbar obj={clickObj}/>
        <SavedPassword obj = {passObj}/>
        <NewPassword obj={clickObj}/>
      </div>
    );
  //   /*<BrowserRouter>
  //     <Routes>
  //       <Route index element={<Login />}></Route>
  //       <Route path="/" element={<Login></Login>}></Route>
  //       <Route path="/Signup" element={<Signup/>}></Route>
  //     </Routes>
  //   </BrowserRouter>*/
  // );
  }
}

export default App;
