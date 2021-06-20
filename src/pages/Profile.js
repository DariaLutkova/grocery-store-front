import React from 'react';
import { List, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import styles from './Profile.module.scss';

const { Title } = Typography;

export default function Profile() {
  const user = {
    firstName: 'Анна',
    lastName: 'Каренина',
    email: 'anna@mail.ru',
    loyaltyCard: '88005553535'
  };
  const data = [
    {
      title: 'Имя',
      key: 'firstName',
    },
    {
      title: 'Фамилия',
      key: 'lastName',
    },
    {
      title: 'Почта',
      key: 'email'
    },
    {
      title: 'Карта лояльности',
      key: 'loyaltyCard',
    },
  ];


  return (
    <>
      <Title>Личный кабинет</Title>
      <div className={styles.profile}>
        <Avatar size={256} icon={<UserOutlined />} />
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <div className={styles.item}>
                <div className={styles.firstColumn}>{item.title}</div>
                <div>{user?.[item?.key]}</div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
