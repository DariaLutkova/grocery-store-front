import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';

import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

import Header from './components/Header';

import 'antd/dist/antd.css';
import styles from './App.module.scss';

const { Content, Footer } = Layout;

export default function App() {
  const isAuth = false;
  return (
    <Router>
      <Layout className={styles.layout}>
        <Header isAuth={isAuth} />
        <Content className={styles.content}>
          {renderRoutes()}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Darya Lutkova ©2021</Footer>
      </Layout>
    </Router>
  );


  function renderRoutes() {
    if (isAuth) return (
      <Switch>
        <Route path="/about">
          <h1>About</h1>
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
    );

    return (
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
    )
  }
}
