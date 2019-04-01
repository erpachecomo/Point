import React from "react";
import Product from "./Product";
import {
  Row,
  Col,
  AutoComplete,
  Input,
  Icon,
  Divider,
  Alert,
  Empty
} from "antd";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
const Search = Input.Search;

const prods = () => {
  let prds = [];
  for (let i = 1; i < 5; i++) {
    prds.push({
      clave: i + "SXD",
      linea: ["Dama", "Infantil", "Caballero"],
      corrida: ["24", "25", "26"],
      color: ["Azul", "Verde", "Rojo"],
      familia: "Familia",
      precio: 19.9 * i,
      cantidad: i * 3,
      descripcion: i + " - Calzado SXD deportivo"
    });
    prds.push({
      clave: i + "RDC",
      linea: ["Caballero", "Dama"],
      corrida: ["24", "25", "26"],
      color: ["Blanco y rojo", "Blanco y verde", "Blanco y azul"],
      familia: "MyFamily",
      precio: 23.78 * i,
      cantidad: i * 3,
      descripcion: i + " Bota RDC"
    });
    prds.push({
      clave: i + "LMN",
      linea: ["Infantil", "Caballero"],
      corrida: ["14", "15", "16"],
      color: ["Negro y blanco", "Negro y azul"],
      familia: "Femenino",
      precio: 32.78 * i,
      cantidad: i * 3,
      descripcion: i + " Calzado escolar "
    });
  }
  return prds;
};
class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: prods(),
      filteredProducts: prods(),
      confirmDirty: false,
      autoCompleteResult: [],
      linea: "",
      color: "",
      corrida: "",
      clave: "",
      claves: ["VANS1234", "CNV432"],
      showError: false,
      errorProduct: ""
    };
  }

  handleSubmit = values => {
    if (
      !values.selectedColor ||
      !values.selectedCorrida ||
      !values.selectedLinea
    ) {
      console.log(values);
      this.setState({
        showError: true,
        errorProduct: values.clave + ":" + values.descripcion
      });
      return;
    }
    this.setState({ showError: false });
    this.props.addProductToTable(values);
  };
  filterProducts = word => {
    word = word.toLowerCase();
    this.setState({
      filteredProducts: this.state.products.filter(product => {
        return (
          product.clave.toLowerCase().includes(word) ||
          product.descripcion.toLowerCase().includes(word) ||
          product.color.find(a => a.toLowerCase().includes(word)) ||
          product.linea.find(a => a.toLowerCase().includes(word))
        );
      })
    });
  };
  render() {
    const products = this.state.filteredProducts.map((product, i) => {
      const catalog = (
        <Col xs={24} sm={24} md={12} lg={8} xl={6} style={{ marginBottom: 10 }}>
          <Product
            cover="https://picsum.photos/200/300/?random"
            avatar="https://picsum.photos/200/300/?random"
            title={product.clave + " - " + product.precio}
            description={product.color + " | " + product.descripcion}
            onclick={this.handleSubmit}
            product={product}
          />
        </Col>
      );
      return catalog;
    });
    return (
      <div>
        <Row span={24}>
          <Col span={24}>
            {this.state.showError ? (
              <Alert
                type="error"
                message={
                  "Por favor selecciona un color, una corrida y una linea del producto " +
                  this.state.errorProduct
                }
                banner
              />
            ) : (
              ""
            )}
            <Divider>
              <AutoComplete onChange={value => this.filterProducts(value)}>
                <Search
                  placeholder="Buscar producto por clave, color, linea o descripcion"
                  style={{ width: 500 }}
                />
              </AutoComplete>
            </Divider>
          </Col>
        </Row>
        {products.length ? (
          products
        ) : (
          <Empty description="Ups! no encontramos ningun articulo con tu busqueda, intenta otras palabras." />
        )}
      </div>
    );
  }
}

export default Catalog;
