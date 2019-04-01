import React from "react";
import {
  Button,
  Card,
  Statistic,
  Avatar,
  Typography,
  Row,
  Col,
  notification,
  Alert,
  message
} from "antd";
import SearchInput from "../utils/SearchInput";

const Text = Typography.Text;

const { Meta } = Card;

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { qty: 1, color: "", corrida: "", linea: "" };
  }
  openNotification = () => {
    message.error(
      <Alert
        message="Error"
        description="This is an error message about copywriting."
        type="error"
        showIcon
        banner
      />
    );

    notification.error({
      placement: "topMiddle",
      message: "Error al agregar producto",
      description: "Por favor selecciona un color, una corrida y una linea",
      style: {
        width: 600,
        marginRight: 335 - 600
      }
    });
  };
  handleSubmit = e => {
    const { qty, corrida, color, linea } = this.state;

    this.props.onclick({
      ...this.props.product,
      pares: qty,
      selectedColor: color,
      selectedCorrida: corrida,
      selectedLinea: linea
    });
  };
  render() {
    const { cover, product } = this.props;
    const { qty } = this.state;
    const colores = product.color.map(value => ({ text: value, value: value }));
    const corridas = product.corrida.map(value => ({
      text: value,
      value: value
    }));
    const lineas = product.linea.map(value => ({ text: value, value: value }));

    return (
      <Card
        size="small"
        cover={<img alt="example" src={cover} />}
        actions={[
          <Button
            icon="minus"
            ghost
            size="small"
            type="danger"
            shape="circle"
            onClick={() => (qty > 1 ? this.setState({ qty: qty - 1 }) : "")}
          />,
          <Button
            onClick={this.handleSubmit}
            type="primary"
            size="small"
          >{`Agregar ${qty}`}</Button>,
          <Button
            icon="plus"
            type="primary"
            size="small"
            ghost
            shape="circle"
            onClick={() => (qty < 100 ? this.setState({ qty: qty + 1 }) : "")}
          />
        ]}
      >
        <Meta
          //avatar={avatar ? <Avatar src={avatar} /> : ""}
          title={
            <Statistic
              prefix={`${product.clave} - $`}
              precision={2}
              value={product.precio}
            />
          }
          description={
            <div>
              <Row>
                <Col>{product.descripcion}</Col>
              </Row>
              <Row>
                <Col span={24}>
                  <SearchInput
                    style={{ width: "100%" }}
                    placeholder="Selecciona un color"
                    firstValue={true}
                    handleChange={color => this.setState({ color })}
                    data={colores}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
                <Col span={24}>
                  <SearchInput
                    style={{ width: "100%" }}
                    placeholder="Selecciona un corrida"
                    firstValue={true}
                    handleChange={corrida => this.setState({ corrida })}
                    data={corridas}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <SearchInput
                    style={{ width: "100%" }}
                    placeholder="Selecciona la linea"
                    firstValue={true}
                    handleChange={linea => this.setState({ linea })}
                    data={lineas}
                  />
                </Col>
              </Row>
            </div>
          }
        />
      </Card>
    );
  }
}
export default Product;
