import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import Registerpage from './components/RegisterPage/RegisterPage';

import { setUser, clearUser } from './redux/actions/user_action';

import firebase from 'myFirebase';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push('/');
        dispatch(setUser(user));
      } else {
        history.push('/login');
        dispatch(clearUser());
      }
    });
  }, []);

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <Switch>
      <Route exact path="/" component={ChatPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={Registerpage} />
    </Switch>
  );
}

export default App;
