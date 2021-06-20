import React, { useState, useEffect } from 'react';
import { Card, Modal, Typography, Comment, Tooltip, Input, Button } from 'antd';
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import cn from 'classnames';

import styles from './Home.module.scss';

const { Meta } = Card;
const { Title, Text } = Typography;

const SORT_TYPES = {
  UP: 'up',
  DOWN: 'down',
};

export default function Home() {
  const initCards = [{
    "id": 1,
    "name": "Молоко Простоквашино ультрапастеризованное 3.2%, 0.95 л",
    "price": 72.0,
    "priceSale": 50.0,
    "count": 150.0,
    "date": "2020-12-28",
    "isNew": false,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcToi9zY15AuWtERyjyHmIYvrZJ9rffWLbiGd27-pn6RXzYwGx0kgJbpnsEsuq5YkhDML3GeniC2wI8&usqp=CAc",
    "productType": 1,
    "supplier": 1,
    "store": 3,
    "sale": 1
  }, {
    "id": 1,
    "name": "Дороже",
    "price": 99.0,
    "priceSale": 50.0,
    "count": 150.0,
    "date": "2020-12-28",
    "isNew": false,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcToi9zY15AuWtERyjyHmIYvrZJ9rffWLbiGd27-pn6RXzYwGx0kgJbpnsEsuq5YkhDML3GeniC2wI8&usqp=CAc",
    "productType": 1,
    "supplier": 1,
    "store": 3,
    "sale": 1
  }];
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState(null);
  const [cards, setCards] = useState([]);
  const [sort, setSort] = useState(SORT_TYPES.UP);
  const comments = [
    {
      product: "Молоко Простоквашино ультрапастеризованное 3.2%, 0.95 л",
      name: "Анна",
      text: "Самое качественное"
    },
  ];
  
  useEffect(() => {
    setCards(initCards.sort((a, b) => a.price - b.price));
  }, [])

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
        {cards.map(renderCard)}
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
            {comments.map(renderComment)}
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
    const newCards = initCards.filter(val => val.name?.toLowerCase()?.includes(newValue));
    setCards(handleSort(newCards, sort));
  }

  function handleSort(data, type) {
    if (!type) return data;
    return data.sort((a, b) => a.price - (type === SORT_TYPES.UP ? b.price : -b.price));
  }

  function handleClear() {
    setSearch(null);
    setSort(null);
    setCards(initCards);
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
        style={{ width: 240 }}
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
    if (comment.product !== selected.name) return null;

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
