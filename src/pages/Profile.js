import React, { useState, useEffect } from 'react';
import {List, Typography, Avatar, Spin} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

import styles from './Profile.module.scss';

const { Title } = Typography;
const QUERY_CARDS = gql`
 query {
    loyaltyCards {
      id,
      email,
      code
    }
  }
`;

export default function Profile(props) {
  const { data, loading } = useQuery(QUERY_CARDS);
  const [loyaltyCard, setLoyaltyCard] = useState(null);
  const fields = [
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

  useEffect(() => {
    if (data?.loyaltyCards && !loyaltyCard && props?.user?.email) {
      setLoyaltyCard(data.loyaltyCards.find(card => {
        return card.email === props.user?.email;
      })?.code);
    }
  }, [data, loyaltyCard, props.user]);

  if (loading) return <div className={styles.spin}><Spin size="large" /></div>

  return (
    <>
      <Title>Личный кабинет</Title>
      <div className={styles.profile}>
        <Avatar size={256} icon={<UserOutlined />} />
        <List
          itemLayout="horizontal"
          dataSource={fields}
          renderItem={item => (
            <List.Item>
              <div className={styles.item}>
                <div className={styles.firstColumn}>{item.title}</div>
                <div>{item.key === 'loyaltyCard' ? loyaltyCard : props.user?.[item?.key]}</div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
}
