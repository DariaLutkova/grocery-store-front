import React from 'react';
import { List, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import styles from './Profile.module.scss';

const { Title } = Typography;

export default function Profile(props) {
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
                <div>{props.user?.[item?.key]}</div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
