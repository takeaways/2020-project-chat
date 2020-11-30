import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import ChatPage from "./components/ChatPage/ChatPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Registerpage from "./components/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ChatPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/register" component={Registerpage}/>
      </Switch>
    </Router>
  );
}

export default App;
