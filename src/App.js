import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import NoMatch from './Components/NoMatch/NoMatch';
import DestinationInfo from './Components/DestinationInfo/DestinationInfo';
import Login from './Components/Login/Login';
import Accommodation from './Components/Accommodation/Accommodation';
import Header from './Components/Header/Header';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [navCollapsed, setNavCollapsed] = useState(true);


  const handleNavCollapsed = () =>{
    setNavCollapsed(!navCollapsed);
  }
  return (
    <div className="App container-fluid">
      <div className="container">
        <UserContext.Provider value= {[loggedInUser, setLoggedInUser]}>
          <Router>
            <Header handleNavCollapsed={handleNavCollapsed} navCollapsed={navCollapsed}/>
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/destinationInfo/:id">
                <DestinationInfo />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/accommodation/:id">
                <Accommodation />
              </PrivateRoute>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Router>
        </UserContext.Provider>
      </div> 
    </div>
  );
}

export default App;
