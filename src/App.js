import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

import Header from './components/Header';

import 'antd/dist/antd.css';
import styles from './App.module.scss';
import {getCookie} from "./utils";

const { Content, Footer } = Layout;
const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/', // your GraphQL Server
});

export default function App() {
  const [user, setUser] = useState(null);
  const isAuth = !!user;

  useEffect(() => {
    const csrftToken = getCookie('csrftoken');
    fetch('api/user/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftToken,
      },
    })
      .then((response) => {
        if (response.status > 400) {
          console.log('error', response);
        }
        return response.json();
      })
      .then((data) => {
        if (data.isAuth) setUser(data);
      });
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout className={styles.layout}>
          <Header isAuth={isAuth} onAuthChange={setUser} />
          <Content className={styles.content}>
            {renderRoutes()}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Darya Lutkova ©2021</Footer>
        </Layout>
      </Router>
    </ApolloProvider>
  );


  function renderRoutes() {
    if (isAuth) return (
      <Switch>
        <Route path="/profile">
          <ProfilePage user={user} />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
    );

    return (
      <Switch>
        <Route path="/login">
          <LoginPage onAuthChange={setUser} />
        </Route>
        <Route path="/register">
          <RegisterPage onAuthChange={setUser} />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
    )
  }
}
