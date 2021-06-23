import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import {Link, useHistory} from "react-router-dom";

import { getCookie } from "../utils";

import styles from './Login.module.scss';

const { Title } = Typography;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

export default function Login(props) {
  const history = useHistory();
  const onFinish = (values) => {
    const csrftToken = getCookie('csrftoken');
    fetch('api/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftToken,
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.status > 400) {
          console.log('error', response);
        }
        return response.json();
      })
      .then((data) => {
        props.onAuthChange(data);
        history.push('/');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <>
      <Title>Вход</Title>
      <Form
        {...layout}
        className={styles.form}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Логин"
          name="username"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свой логин!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свой пароль!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
          <Link to="/register">
            <Button type="link">
              Регистрация
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}
