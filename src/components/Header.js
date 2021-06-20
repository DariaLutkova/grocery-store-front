import React from 'react';
import { useLocation, NavLink as Link } from 'react-router-dom';
import {Layout, Menu} from "antd";


const { Header } = Layout;

export default function Head(props) {
  const location = useLocation();
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
        {renderHeader()}
      </Menu>
    </Header>
  );

  function renderHeader() {
    if (props.isAuth) return (
      <>
        <Menu.Item key="/"><Link to="/" exact>Главная</Link></Menu.Item>
        <Menu.Item key="/about"><Link to="/about">About</Link></Menu.Item>
        <Menu.Item key="/profile"><Link to="/profile">Профиль</Link></Menu.Item>
      </>
    );

    return (
      <>
        <Menu.Item key="/"><Link to="/" exact>Главная</Link></Menu.Item>
        <Menu.Item key="/register"><Link to="/register">Регистрация</Link></Menu.Item>
        <Menu.Item key="/login"><Link to="/login">Вход</Link></Menu.Item>
      </>
    );
  }
}
