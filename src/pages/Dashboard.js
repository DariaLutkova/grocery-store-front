import React, { useState } from 'react';
import {Table, Typography, Card, Spin, Modal, Form, Input, Button} from 'antd';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

import styles from './Dashboard.module.scss';
import {PlusCircleOutlined} from "@ant-design/icons";

const { Title } = Typography;
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20, offset: 2 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};
const QUERY_DASHBOARD = gql`
  query {
    loyaltyCards {
      id,
      code
    }
    stores {
      id
      address
      city
    }
    sales {
      id
      name
      description
    }
    suppliers {
      id
      name
      address
      city
    }
  }
`;

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const { data, loading } = useQuery(QUERY_DASHBOARD);
  const columns1 = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    }
  ];
  const columns2 = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Город',
      dataIndex: 'city',
      key: 'city',
    }
  ];
  const columns3 = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Город',
      dataIndex: 'city',
      key: 'city',
    }
  ];
  const columns4 = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    }
  ];

  if (loading) return <div className={styles.spin}><Spin size="large" /></div>

  return (
    <>
      <Title>Дашборд</Title>
      <div className={styles.tables}>
        <Card title="Скидки" bodyStyle={{ padding: 0 }} extra={<PlusCircleOutlined onClick={() => setIsVisible(true)} />}>
          <Table dataSource={data?.sales} columns={columns1} />
        </Card>
        <Card title="Магазины" bodyStyle={{ padding: 0 }}>
          <Table dataSource={data?.stores} columns={columns2} />
        </Card>
        <Card title="Поставщики" bodyStyle={{ padding: 0 }}>
          <Table dataSource={data?.suppliers} columns={columns3} />
        </Card>
        <Card title="Карты лояльности" bodyStyle={{ padding: 0 }}>
          <Table dataSource={data?.loyaltyCards} columns={columns4} />
        </Card>
      </div>
      <Modal visible={isVisible} footer={null} onCancel={() => setIsVisible(false)}>
        <Title level={3}>Добавление скидки</Title>
        <Form className={styles.form} {...layout} name="control-hooks" onFinish={handleFinish}>
          <Form.Item name="name" label="Название" rules={[{ required: true, message: 'Обязательное поле' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Описание" rules={[{ required: true, message: 'Обязательное поле' }]}>
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );

  function handleFinish(values) {
    console.info(values);
  }
}
