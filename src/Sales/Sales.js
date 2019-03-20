import React from "react";
import { Row, Col, Divider } from "antd";

import Table from "./SalesTable";
import AddProduct from "./AddProduct";
import SalesHeader from "./Header";
import { MoneytoNumber, NumbertoMoney } from "../utils/Parser";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { roundToTwo } from "../utils/Math";

class Sales extends React.Component {
  constructor() {
    super();
    this.state = { products: [], total: 0, subtotal: 0, iva: 0 };
  }

  handleAddProduct(product) {
    this.addProductToTable(product);
  }
  addProductToTable = product => {
    product.precio = NumbertoMoney(product.precio);

    this.setState({ products: [...this.state.products, product] });
  };

  handleDeleteProduct(key) {
    this.deleteProduct(key);
  }
  deleteProduct = key => {
    const products = [...this.state.products];
    this.setState({ products: products.filter(item => item.key !== key) });
  };

  render() {
    const { products } = this.state;
    const total = products.reduce(
      (total, product) => total + product.pares * MoneytoNumber(product.precio),
      0
    );

    const iva = total * 0.16;

    const subtotal = total - iva;
    return (
      <div>
        <Row>
          <Col span={24}>
            <SalesHeader />
          </Col>
        </Row>
        <Divider>Carrito de productos</Divider>
        <Row gutter={10}>
          <Col span={18}>
            <Table
              deleteProduct={key => this.handleDeleteProduct(key)}
              products={products}
            />
          </Col>
          <Col span={6}>
            <Divider>Agregar producto</Divider>
            <AddProduct
              addProductToTable={product => this.handleAddProduct(product)}
            />
            <Divider>Opciones de pago</Divider>
          </Col>
        </Row>
        <Row className="background-blue">
          <Col span={6}>Total: {NumbertoMoney(total)}</Col>
          <Col span={6}>Subtotal: {NumbertoMoney(subtotal)}</Col>
          <Col span={6}>IVA: {NumbertoMoney(iva)}</Col>
          <Col span={6}>PAGAR</Col>
        </Row>
      </div>
    );
  }
}

export default Sales;
