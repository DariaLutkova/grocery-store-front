import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Layout, Menu } from 'antd';

import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';

import 'antd/dist/antd.css';
import styles from './App.module.scss';

const { Header, Content, Footer } = Layout;

export default function App() {
  const isAuth = true;

  return (
    <Router>
      <Layout className={styles.layout}>
        <Header>
          <Menu theme="dark" mode="horizontal" selectedKeys={[window.location.pathname]}>
            {renderHeader()}
          </Menu>
        </Header>
        <Content className={styles.content}>
          {renderRoutes()}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Darya Lutkova ©2021</Footer>
      </Layout>
    </Router>
  );

  function renderHeader() {
    if (isAuth) return (
      <>
        <Menu.Item key="/"><Link to="/">Главная</Link></Menu.Item>
        <Menu.Item key="/about"><Link to="/about">About</Link></Menu.Item>
        <Menu.Item key="/profile"><Link to="/profile">Профиль</Link></Menu.Item>
      </>
    );

    return (
      <>
        <Menu.Item key="/"><Link to="/">Главная</Link></Menu.Item>
        <Menu.Item key="/register"><Link to="/register">Регистрация</Link></Menu.Item>
        <Menu.Item key="/login"><Link to="/login">Вход</Link></Menu.Item>
      </>
    );
  }

  function renderRoutes() {
    if (isAuth) return (
      <Switch>
        <Route path="/about">
          <h1>About</h1>
        </Route>
        <Route path="/profile">
          <ProfilePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/login">
        <h1>Login</h1>
      </Route>
      <Route path="/register">
        <h1>Register</h1>
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  )
}
