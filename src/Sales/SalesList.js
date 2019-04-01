import React from "react";
import InfiniteScroll from "react-infinite-scroller";

import "antd/dist/antd.css";
import "./CartList.css";

import { List, Typography, Icon, Card, Button } from "antd";
const { Title } = Typography;

const gridStyleLeft = {
  width: "50%",
  textAlign: "left"
};
const gridStyleRight = {
  width: "50%",
  textAlign: "right"
};
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const CartList = props => {
  const listData = props.products;
  const { total, subtotal, iva } = props;
  const resume = [];
  resume.push({ title: "Total: ", value: total });
  console.log(listData);
  return (
    <div className="demo-infinite-container">
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        //loadMore={this.handleInfiniteOnLoad}
        //hasMore={!this.state.loading && this.state.hasMore}
        useWindow={false}
      >
        <List
          gutter={10}
          style={{ padding: 10 }}
          className="CartList"
          itemLayout="vertical"
          size="small"
          dataSource={listData}
          footer={
            <div>
              <Card bordered={false} size="small">
                <Card.Grid style={gridStyleLeft}>
                  <Title level={4}>Subtotal:</Title>
                  <Title level={4}>IVA:</Title>
                  <Title strong level={4}>
                    Total:
                  </Title>
                </Card.Grid>
                <Card.Grid style={gridStyleRight}>
                  <Title level={4}>{subtotal}</Title>
                  <Title level={4}>{iva}</Title>
                  <Title strong level={4}>
                    {total}
                  </Title>
                </Card.Grid>
              </Card>
            </div>
          }
          renderItem={item => (
            <List.Item
              key={item.clave}
              actions={[
                <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />,
                <Icon
                  type="minus-circle"
                  theme="twoTone"
                  twoToneColor="#d4b106"
                />,
                <p>{item.pares}</p>,
                <Icon
                  type="plus-circle"
                  theme="twoTone"
                  twoToneColor="#d4b106"
                />
              ]}
              extra={<Title>{item.pares * item.precio}</Title>}
            >
              <List.Item.Meta
                //avatar={<Avatar src={item.avatar} />}
                title={`${item.descripcion} - ${item.clave}`}
                description={`${item.pares} × ${item.precio}`}
              />
              {`Linea: ${item.linea} | Corrida: ${item.corrida} | Color: ${
                item.color
              } | Familia: ${item.familia} `}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
export default CartList;
