import React from "react";

import "antd/dist/antd.css";
import "./CartList.css";

import {
  Statistic,
  Tag,
  Divider,
  Typography,
  Icon,
  Row,
  Col,
  Empty,
  Table
} from "antd";

const { Title, Text } = Typography;

class ListElement extends React.Component {
  constructor(props) {
    super(props);
  }
  modifyQty = (key, qty) => {
    this.props.modifyQty(key, qty);
  };
  delete = key => {
    const { deleteProduct } = this.props;
    deleteProduct(key);
  };

  render() {
    const { products } = this.props;
    const columns = [
      {
        dataIndex: "delete",
        key: "delete",
        render: (text, product, index) => {
          return (
            <div>
              <Row gutter={10}>
                <Col span={12} className="left">
                  <Text strong level={4}>
                    <Icon
                      type="delete"
                      theme="twoTone"
                      twoToneColor="#eb2f96"
                      onClick={() => this.delete(product)}
                    />
                    <Divider type="vertical" />
                    {`${product.clave}`}
                  </Text>
                </Col>
                <Col span={12}>
                  <Text strong level={1}>
                    <Icon
                      type="minus-circle"
                      theme="twoTone"
                      twoToneColor="#fadb14"
                      onClick={() => this.modifyQty({ ...product, pares: -1 })}
                    />
                    <Divider type="vertical" />
                    {`${product.pares}`}
                    <Divider type="vertical" />
                    <Icon
                      type="plus-circle"
                      theme="twoTone"
                      twoToneColor="#fadb14"
                      onClick={() => this.modifyQty({ ...product, pares: 1 })}
                    />
                  </Text>
                </Col>
              </Row>

              <Row>
                <Col span={24} className="left">
                  <Text type="secondary">{`${product.descripcion}`}</Text>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={24} className="left">
                  <Tag color="#f50">{product.selectedLinea}</Tag>
                  <Tag color="#2db7f5">{product.selectedCorrida}</Tag>
                  <Tag color="#87d068">{product.selectedColor}</Tag>
                  <Tag color="#108ee9">{product.familia}</Tag>
                </Col>
              </Row>
            </div>
          );
        }
      },
      {
        dataIndex: "delete",
        key: "delete",
        render: (text, product, index) => (
          <Statistic
            prefix="$"
            value={product.pares * product.precio}
            precision={2}
          />
        )
      }
    ];

    const prods = products.map(product => {
      return { clave: product.clave };
    });
    return prods.length > 0 ? (
      <Table
        dataSource={products}
        size="small"
        showHeader={false}
        title={() => <Title level={4}>Carrito</Title>}
        pagination={{ position: "none" }}
        columns={columns}
      />
    ) : (
      <Empty description="Agrega un producto al carrito" />
    );
  }
}

export default ListElement;
