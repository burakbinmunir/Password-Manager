import React,{Component} from 'react';
import './App.css';
import Login from './Pages/Login/login';
import Signup from './Pages/Signup/signup';

class App extends Component {
  currentUser = null;

  constructor (){
    super();
    this.state = {
      route : 'login',
    }
  }

  render () {
    

    const clickObj = {
      page : this.state.route,

      changeRoute : ( newRoute ) => {
        this.setState({route : newRoute});
      },

      setCurrentUser : (cUser) => {
        this.currentUser = cUser;
      }
    }
  

    return (
      <div>
        <Login obj = {clickObj}/>
        <Signup obj = {clickObj}/>
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
