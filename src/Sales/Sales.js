import React from "react";
import {
  Typography,
  Row,
  Col,
  Divider,
  Button,
  Statistic,
  Input,
  Icon,
  Select,
  InputNumber,
  Switch
} from "antd";

import Table from "./SalesTable";
import List from "./SalesList";
import Ticket from "./ListElement";
import AddProduct from "./AddProduct";
import SalesHeader from "./Header";
import ModalPayment from "./ModalPayment";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Catalog from "./Catalog";
import ModalApartado from "./ModalApartado";
const { Title, Text } = Typography;
const Option = Select.Option;

class Sales extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          clave: "DCS1234",
          selectedLinea: "Hombre",
          selectedCorrida: "25.5",
          selectedColor: "Azul y blanco",
          familia: "Skate",
          precio: 150.5,
          pares: 2,
          descripcion: "ASDFA S DF ASDFA S DFA SDF"
        }
      ],
      total: 0,
      subtotal: 0,
      iva: 0,
      discount: 0,
      checked: true,
      valueDiscount: 0,
      visible: false
    };
  }
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

    const disc = typeDiscount ? value : (total * value) / 100;
    this.setState({ discount: disc, valueDiscount: value });
  };

  handleAddProduct(product) {
    this.addProductToTable(product);
  }
  addProductToTable = product => {
    if (
      this.state.products.filter(prod => prod.clave === product.clave).length >
      0
    )
      this.modifyQty(product.clave, product.pares);
    else this.setState({ products: [...this.state.products, product] });
    console.log(this.state.products);
  };

  handleDeleteProduct(key) {
    this.deleteProduct(key);
  }
  deleteProduct = key => {
    const products = [...this.state.products];
    this.setState({ products: products.filter(item => item.clave !== key) });
  };
  modifyQty = (key, qty) => {
    const products = [...this.state.products];

    this.setState({
      products: products.map(item => {
        const newQty = item.pares + qty;
        if (item.clave === key)
          item.pares = newQty > 0 && newQty < 100 ? newQty : item.pares;
        return item;
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
      visible,
      visibleApartado
    } = this.state;

    const total =
      products.reduce(
        (total, product) => total + product.pares * product.precio,
        0
      ) - discount;

    const iva = total * 0.16;

    const subtotal = total - iva;
    return (
      <div>
        {/*/}<Row>
          <Col span={24}>
            <SalesHeader />
          </Col>
        </Row>{/*/}
        <Divider style={{ backgroundColor: "#0050b3" }} />
        <Row gutter={10}>
          <Col md={12} lg={12} xl={17}>
            {/*/}
            <Divider>Agregar producto</Divider>
            <AddProduct
              addProductToTable={product => this.handleAddProduct(product)}
            />

            {/*/}
            <Catalog
              span={24}
              gutter={10}
              addProductToTable={product => this.handleAddProduct(product)}
            />
          </Col>
          <Col md={12} lg={12} xl={7}>
            {/*/}
            <Table
              deleteProduct={key => this.handleDeleteProduct(key)}
              products={products}
            />
            {/*}
            <Affix offsetTop={10}>
            {/*/}
            <div style={{ backgroundColor: "white" }}>
              <Divider />
              <Title level={4}>Carrito</Title>
              <Ticket
                products={products}
                modifyQty={(key, qty) => this.modifyQty(key, qty)}
                deleteProduct={key => this.handleDeleteProduct(key)}
              />
              {/*/}<List
                products={products}
                total={NumbertoMoney(total)}
                subtotal={NumbertoMoney(subtotal)}
                iva={NumbertoMoney(iva)}
              />
              {/*/}
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
                    <Statistic prefix="$" precision={2} value={discount} />
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
                    <Statistic prefix="$" precision={2} value={subtotal} />
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
                    <Statistic prefix="$" precision={2} value={iva} />
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
                    <Statistic prefix="$" precision={2} value={total} />
                  </Col>
                </Row>
              </div>
              <Row gutter={16}>
                <Col offset={1} span={13}>
                  <Button
                    block
                    type="primary"
                    onClick={() => this.setState({ visible: true })}
                  >
                    Pagar
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    block
                    onClick={() => this.setState({ visibleApartado: true })}
                  >
                    Crear Apartado
                  </Button>
                </Col>
              </Row>
              <Divider style={{ backgroundColor: "white" }} />
            </div>
          </Col>
        </Row>
        <ModalPayment
          visible={visible}
          hideDrawer={this.hideDrawer}
          total={total}
        />
        <ModalApartado
          visible={visibleApartado}
          hideDrawer={this.hideDrawerApartado}
          total={total}
        />
      </div>
    );
  }
}

export default Sales;
