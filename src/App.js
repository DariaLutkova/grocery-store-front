import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { Layout, Menu } from 'antd';

import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

export default function App() {
  const isAuth = true;

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" selectedKeys={[window.location.pathname]}>
            {renderHeader()}
          </Menu>
        </Header>
        <Content style={{ height: '100vh' }}>
          {renderRoutes()}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Darya Lutkova ©2021</Footer>
      </Layout>
    </Router>
  );

  function renderHeader() {
    if (isAuth) return (
      <>
        <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="/about"><Link to="/about">About</Link></Menu.Item>
        <Menu.Item key="/profile"><Link to="/profile">Profile</Link></Menu.Item>
      </>
    );

    return (
      <>
        <Menu.Item key="/"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="/register"><Link to="/register">Register</Link></Menu.Item>
        <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>
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
          <h1>Profile</h1>
        </Route>
        <Route path="/">
          <h1>Home</h1>
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
        <h1>Home</h1>
      </Route>
    </Switch>
  )
}
