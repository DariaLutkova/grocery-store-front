import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import {Link} from "react-router-dom";

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

export default function Login() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
