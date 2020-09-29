import React, { useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import 'react-datepicker/dist/react-datepicker.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Firebase/Login';
import Booking from './components/Booking/Booking';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Listing from './components/Listings/Listing';


export const UserContext = React.createContext();

function App() { 

  const [loggedInUser, setLoggedInUser] = useState({});
  const [verifyMsg, setVerifyMsg] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    fName: '',
    lName: '',
    email: '',
    password: '',
    cPassword: '',
    error: '',
    success: false
});

  return (
    <UserContext.Provider value={{loggedUser: [loggedInUser, setLoggedInUser], userState: [user, setUser], verifyLink: [verifyMsg, setVerifyMsg]}}>
      <Router>
        <Switch>
          <Route exact path='/'>
          <Home />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/area/:areaName'>
            <Booking />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <PrivateRoute path='/listings/:areaName'>
            <Listing />
          </PrivateRoute> 
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
