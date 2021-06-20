import React, { useState } from 'react';
import { Card, Modal, Typography, Comment, Tooltip } from 'antd';

import styles from './Home.module.scss';

const { Meta } = Card;
const { Title, Text } = Typography;

export default function Home() {
  const [selected, setSelected] = useState(null);
  const cards = [{
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
  }];
  const comments = [
    {
      product: "Молоко Простоквашино ультрапастеризованное 3.2%, 0.95 л",
      name: "Анна",
      text: "Самое качественное"
    },
  ]

  return (
    <div>
      {cards.map(renderCard)}
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
    </div>
  );

  function renderCard(card) {
    return (
      <Card
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
