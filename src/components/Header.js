import React from 'react';
import { useLocation, NavLink as Link, useHistory } from 'react-router-dom';
import {Layout, Menu} from "antd";
import {getCookie} from "../utils";


const { Header } = Layout;

export default function Head(props) {
  const location = useLocation();
  const history = useHistory();
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
        <Menu.Item key="/profile"><Link to="/profile">Профиль</Link></Menu.Item>
        <Menu.Item key="/exit" onClick={handleExit}>Выход</Menu.Item>
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

  function handleExit() {
    const csrftToken = getCookie('csrftoken');
    fetch('api/logout/', {
      method: 'POST',
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
      .then(() => {
        props.onAuthChange(null);
        history.push('/');
      });
  }
}
