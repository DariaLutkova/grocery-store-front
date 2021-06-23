import React, { useState, useEffect } from 'react';
import {Card, Modal, Typography, Comment, Tooltip, Input, Button, Spin} from 'antd';
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import cn from 'classnames';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

import styles from './Home.module.scss';

const { Meta } = Card;
const { Title, Text } = Typography;

const SORT_TYPES = {
  UP: 'up',
  DOWN: 'down',
};
const QUERY_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
      priceSale
      image
    }
    reviews {
      id
      name
      product {
        id
      }
      text
    }
  }
`;

export default function Home() {
  const { data, loading } = useQuery(QUERY_PRODUCTS);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState(null);
  const [cards, setCards] = useState(null);
  const [sort, setSort] = useState(SORT_TYPES.UP);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    if (data && !cards) setCards(data?.products?.sort((a, b) => a.price - b.price));
    if (data && !comments) setComments(data?.reviews);
  }, [cards, data, comments]);

  if (loading) return <div className={styles.spin}><Spin size="large" /></div>

  return (
    <>
      <Title>Каталог продуктов</Title>
      <Input.Search className={styles.search} placeholder="Начните вводить" value={search} onChange={handleSearch} />
      <Button className={styles.btn} type="primary" icon={renderIcon()} onClick={handleButtonClick}>
        Сначала {sort === SORT_TYPES.UP ? 'дешевле' : 'дороже'}
      </Button>
      <Button className={cn(styles.btn, styles.clear)} onClick={handleClear}>
        Очистить
      </Button>
      <div className={styles.cards}>
        {cards && cards.map(renderCard)}
      </div>
      <Modal visible={selected} footer={null} onCancel={() => setSelected(null)}>
        <div className={styles.modal}>
          <div className={styles.banner} style={{ backgroundImage: `url(${selected?.image})` }} />
          <div className={styles.info}>
            <Title level={4}>{selected?.name}</Title>
            {
              selected?.price === selected?.priceSale
                ? <Text>Цена: {selected?.price} ₽</Text>
                : <div>
                  <Text>Цена: </Text>
                  <Text delete>{selected?.price} ₽</Text>
                  <Text type="danger"> {selected?.priceSale} ₽</Text>
                </div>
            }
            <Title level={5} style={{ marginTop: '16px' }}>Отзывы</Title>
            {comments && comments.map(renderComment)}
          </div>
        </div>
      </Modal>
    </>
  );

  function handleButtonClick() {
    const newSort = (sort === SORT_TYPES.UP) ? SORT_TYPES.DOWN : SORT_TYPES.UP;
    setSort(newSort);
    setCards(handleSort(cards, newSort));
  }

  function handleSearch(e) {
    const newValue = e.target.value.toLowerCase();
    setSearch(newValue);
    const newCards = data?.products?.filter(val => val.name?.toLowerCase()?.includes(newValue));
    setCards(handleSort(newCards, sort));
  }

  function handleSort(data, type) {
    if (!type) return data;
    return data.sort((a, b) => a.price - (type === SORT_TYPES.UP ? b.price : -b.price));
  }

  function handleClear() {
    setSearch(null);
    setSort(null);
    setCards(data?.products);
  }

  function renderIcon() {
    if (sort === SORT_TYPES.UP) return <UpOutlined />;

    return <DownOutlined />
  }

  function renderCard(card) {
    return (
      <Card
        key={card.name}
        hoverable
        className={styles.card}
        cover={<img alt={card.name} src={card.image} />}
        onClick={() => setSelected(card)}
      >
        <Meta title={<Tooltip title={card.name}>
          <div className="ant-card-meta-title">{card.name}</div>
        </Tooltip>} description={`Цена: ${card.price} ₽`} />
      </Card>
    )
  }

  function renderComment(comment) {
    if (!selected) return null;
    if (comment.product.id !== selected.id) return null;

    return (
      <Comment
        key={comment.text}
        author={comment?.name}
        content={
          <p>
            {comment.text}
          </p>
        }
      />
    );
  }
}
