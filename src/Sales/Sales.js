import React from "react";
import {
  Typography,
  Row,
  Col,
  Divider,
  Button,
  Statistic,
  InputNumber,
  Switch
} from "antd";

import Ticket from "./ListElement";
import ModalPayment from "./ModalPayment";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Catalog from "./Catalog";
import ModalApartado from "./ModalApartado";
import Payment from "./Payment";
const { Title, Text } = Typography;

class Sales extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      total: 0,
      subtotal: 0,
      iva: 0,
      discount: 0,
      checked: true,
      valueDiscount: 0,
      visible: false
    };
  }
  printTicket = type => {};
  changeDiscount = () => {
    const { valueDiscount, checked } = this.state;
    console.log("Fired! " + checked);

    this.setState({ checked: !checked });
    this.applyDiscount(valueDiscount, !checked);
  };
  applyDiscount = (value, typeDiscount) => {
    const { checked, products } = this.state;
    typeDiscount = typeDiscount === undefined ? checked : typeDiscount;
    const total = products.reduce(
      (total, product) => total + product.pares * product.precio,
      0
    );

    this.setState({
      discount: this.getDiscountFromPayment(value, total, typeDiscount),
      value: this.getValueDiscountFromPayment(value, total, typeDiscount)
    });
  };
  getDiscountFromPayment = (value, total, typeDiscount) => {
    if (value < 0) return 0;
    const discount = typeDiscount //checked
      ? value > total
        ? total
        : value
      : value > 100
      ? total
      : (total * value) / 100;
    return discount;
  };
  getValueDiscountFromPayment = (value, total, typeDiscount) => {
    if (value < 0) return 0;
    if (typeDiscount) return value > total ? total : value;
    return value > 100 ? 100 : (total * value) / 100;
  };
  handleAddProduct(product) {
    this.addProductToTable(product);
  }
  addProductToTable = product => {
    if (
      this.state.products.filter(
        prod =>
          prod.clave === product.clave &&
          prod.selectedColor === product.selectedColor &&
          prod.selectedCorrida === product.selectedCorrida &&
          prod.selectedLinea === product.selectedLinea
      ).length > 0
    )
      this.modifyQty({ ...product });
    else this.setState({ products: [...this.state.products, product] });
  };

  handleDeleteProduct(key) {
    this.deleteProduct(key);
  }
  deleteProduct = prod => {
    const products = [...this.state.products];
    this.setState({
      products: products.filter(product => product != prod)
    });
  };
  modifyQty = article => {
    const {
      clave,
      selectedColor,
      selectedCorrida,
      selectedLinea,
      pares
    } = article;
    const products = [...this.state.products];

    this.setState({
      products: products.map(product => {
        const newQty = product.pares + pares;
        if (
          product.clave === clave &&
          selectedColor === product.selectedColor &&
          selectedCorrida === product.selectedCorrida &&
          selectedLinea === product.selectedLinea
        )
          product.pares = newQty > 0 && newQty < 100 ? newQty : product.pares;
        return product;
      })
    });
  };

  hideDrawerApartado = () => this.setState({ visibleApartado: false });

  hideDrawer = () => this.setState({ visible: false });

  render() {
    const {
      products,
      discount,
      valueDiscount,
      checked,
      visibleApartado
    } = this.state;

    const disabledButton = products.length <= 0;
    const total =
      products.reduce(
        (total, product) => total + product.pares * product.precio,
        0
      ) - discount;

    const iva = total * 0.16;

    const subtotal = total - iva;
    return (
      <div>
        <Divider style={{ backgroundColor: "#0050b3" }} />
        <Row gutter={10}>
          <Col md={12} lg={12} xl={17}>
            <Catalog
              span={24}
              gutter={10}
              addProductToTable={product => this.handleAddProduct(product)}
            />
          </Col>
          <Col md={12} lg={12} xl={7}>
            <div style={{ backgroundColor: "white" }}>
              <Ticket
                products={products}
                modifyQty={(key, qty) => this.modifyQty(key, qty)}
                deleteProduct={key => this.handleDeleteProduct(key)}
              />

              <Row style={{ padding: 10 }} gutter={25}>
                <Col span={18} className="left">
                  <Text strong level={4}>
                    {`Descuento`}
                  </Text>
                  <Divider type="vertical" />

                  <InputNumber
                    max={checked ? total : 100}
                    min={0}
                    defaultValue={0}
                    onChange={value => this.applyDiscount(value)}
                  >
                    {valueDiscount}
                  </InputNumber>
                  <Divider type="vertical" />
                  {`% `}
                  <Switch
                    defaultChecked
                    onChange={() => this.changeDiscount()}
                  />
                  {` $`}
                </Col>
                <Col span={6} className="right">
                  <Text level={4}>
                    <Statistic
                      prefix="$"
                      precision={2}
                      value={discount ? discount : 0}
                    />
                  </Text>
                </Col>
              </Row>
              <Row style={{ padding: 10 }} gutter={25}>
                <Col span={12} className="left">
                  <Text strong level={4}>
                    Subtotal
                  </Text>
                </Col>
                <Col span={12} className="right">
                  <Text level={4}>
                    <Statistic
                      prefix="$"
                      precision={2}
                      value={subtotal ? subtotal : 0}
                    />
                  </Text>
                </Col>
              </Row>
              <Col span={22} offset={1}>
                <hr
                  style={{
                    borderwidth: "0.5px",
                    borderStyle: "dashed",
                    borderColor: "#f5f5f5"
                  }}
                  span={22}
                />
              </Col>

              <Row style={{ padding: 10 }} gutter={25}>
                <Col span={12} className="left">
                  <Text strong level={4}>
                    IVA
                  </Text>
                  <Text type="secondary">{` 16%`}</Text>
                </Col>
                <Col span={12} className="right">
                  <Text level={4}>
                    <Statistic prefix="$" precision={2} value={iva ? iva : 0} />
                  </Text>
                </Col>
              </Row>
              <div style={{ padding: 25, backgroundColor: "white" }}>
                <Row
                  style={{ padding: 10, backgroundColor: "#f5f5f5" }}
                  gutter={25}
                >
                  <Col span={12} className="left">
                    <Title level={4}>Total</Title>
                  </Col>
                  <Col span={12} className="right">
                    <Statistic
                      prefix="$"
                      precision={2}
                      value={total ? total : 0}
                    />
                  </Col>
                </Row>
              </div>
              <Row gutter={16}>
                <Col offset={1} span={13}>
                  <Button
                    block
                    type="primary"
                    disabled={disabledButton}
                    onClick={() => this.setState({ visible: true })}
                  >
                    Pagar
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    block
                    disabled={disabledButton}
                    onClick={() => this.setState({ visibleApartado: true })}
                  >
                    Crear Apartado
                  </Button>
                </Col>
              </Row>
              <Divider style={{ backgroundColor: "white" }} />
            </div>
            {disabledButton ? (
              ""
            ) : (
              <Payment total={total} products={products} discount={discount} />
            )}
          </Col>
        </Row>

        <ModalApartado
          visible={visibleApartado}
          hideDrawer={this.hideDrawerApartado}
          total={total}
          products={products}
          discount={discount}
        />
      </div>
    );
  }
}

export default Sales;
