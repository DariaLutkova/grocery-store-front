import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import {Link, useHistory} from "react-router-dom";

import styles from './Register.module.scss';
import {getCookie} from "../utils";

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
const originPath = window.location?.origin;

export default function Register(props) {
  const history = useHistory();
  const onFinish = (values) => {
    const csrftToken = getCookie('csrftoken');
    fetch(`${originPath}/api/registration/`, {
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
        props.onAuthChange({
          ...values,
          role: data.role,
        });
        history.push('/');
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Title>Регистрация</Title>
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
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Подтвердите пароль"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста, подтвердите пароль!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'Не валидная электронная почта!',
            },
            {
              required: true,
              message: 'Пожалуйста, введите адрес электронной почты!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Имя"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите своё имя!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите свою фамилию!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Регистрация
          </Button>
          <Link to="/login">
            <Button type="link">
              Войти
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  )
}
