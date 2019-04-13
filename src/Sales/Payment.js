import React from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Radio,
  Statistic,
  InputNumber,
  Divider,
  notification,
  Alert
} from "antd";
import SearchInput from "../utils/SearchInput";
import Ticket from "./Ticket";
import ReactToPrint from "react-to-print";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class ModalPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      metodo: "efectivo",
      pago: 0,
      showErrorPayment: false,
      disabledPrintButton: true
    };
  }
  handleChange = value => {
    console.log(value);
  };

  validatePay = () => {
    const { pago, cliente, vendedor } = this.state;
    const { total } = this.props;

    if (pago >= total && vendedor && cliente) {
      this.openNotification("pago");
      this.setState({ showErrorPayment: false, disabledPrintButton: false });
      return;
    }
    if (!vendedor)
      this.setState({ showErrorSalesman: true, disabledPrintButton: true });
    if (!cliente)
      this.setState({ showErrorClient: true, disabledPrintButton: true });

    if (pago < total)
      this.setState({ showErrorPayment: true, disabledPrintButton: true });
  };
  openNotification = type => {
    const { pago } = this.state;
    const { total } = this.props;
    const description =
      pago - total === 0
        ? "Procede a imprimir el ticket"
        : `Regresa $ ${pago - total} de cambio al cliente e imprime el ticket.`;
    if (type === "pago")
      notification.success({
        placement: "bottomLeft",
        message: "Pago correcto",
        description: description,
        style: {
          width: 600,
          marginRight: 335 - 600
        }
      });
    if (type === "imprimir")
      notification.info({
        placement: "bottomLeft",
        message: "Generando ticket...",
        style: {
          width: 600,
          marginRight: 335 - 600
        }
      });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { total, products, discount } = this.props;
    const {
      pago,
      metodo,
      disabledPrintButton,
      showErrorPayment,
      cliente,
      vendedor,
      showErrorClient,
      showErrorSalesman
    } = this.state;
    return (
      <div style={{ padding: 25, backgroundColor: "white" }}>
        <Row>
          <Col span={24}>
            <Form layout="horizontal" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  {showErrorClient ? (
                    <Alert
                      type="error"
                      message={"Selecciona un cliente"}
                      banner
                    />
                  ) : (
                    ""
                  )}
                  <Form.Item label="Cliente">
                    {getFieldDecorator("cliente", {
                      setFieldsValue: cliente,
                      initialValue: "Mostrador",
                      rules: [
                        {
                          required: true,
                          message: "Selecciona un cliente"
                        }
                      ]
                    })(
                      <SearchInput
                        placeholder="Selecciona un cliente"
                        handleSearch={cliente =>
                          this.setState({
                            cliente: "",
                            showErrorClient: false
                          })
                        }
                        handleChange={cliente =>
                          this.setState({ cliente, showErrorClient: false })
                        }
                        data={[
                          { text: "Mostrador", value: "0" },
                          { text: "Martin", value: "1" },
                          { text: "Maria", value: "2" },
                          { text: "Alberto", value: "3" }
                        ]}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {showErrorSalesman ? (
                    <Alert
                      type="error"
                      message={"Selecciona un vendedor"}
                      banner
                    />
                  ) : (
                    ""
                  )}
                  <Form.Item label="Vendedor">
                    {getFieldDecorator("vendedor", {
                      setFieldsValue: vendedor,
                      initialValue: "Mostrador",
                      rules: [
                        {
                          required: true,
                          message: "Selecciona un vendedor"
                        }
                      ]
                    })(
                      <SearchInput
                        placeholder="Selecciona un vendedor"
                        handleSearch={vendedor =>
                          this.setState({
                            vendedor: "",
                            showErrorSalesman: false
                          })
                        }
                        handleChange={vendedor =>
                          this.setState({
                            vendedor,
                            showErrorSalesman: false
                          })
                        }
                        data={[
                          { text: "Mostrador", value: "0" },
                          { text: "Jose", value: "1" },
                          { text: "Jesus", value: "2" },
                          { text: "Marcela", value: "3" }
                        ]}
                      />
                    )}
                  </Form.Item>
                </Col>

                <Divider />
                <Col span={24}>
                  <Form.Item label="Método de Pago">
                    {getFieldDecorator("metodo", {
                      initialValue: "efectivo",
                      setFieldsValue: metodo,
                      rules: [
                        {
                          required: true,
                          message: "Selecciona un método de pago"
                        }
                      ]
                    })(
                      <RadioGroup
                        buttonStyle="solid"
                        onChange={e => {
                          const st = {
                            metodo: e.target.value,
                            pago:
                              e.target.value === "tarjeta"
                                ? this.props.total
                                : 0
                          };
                          this.setState(st);
                        }}
                        //value={metodo}
                      >
                        <RadioButton value="efectivo">Efectivo</RadioButton>
                        <RadioButton value="tarjeta">
                          Tarjeta de Débito/Crédito
                        </RadioButton>
                      </RadioGroup>
                    )}
                  </Form.Item>
                </Col>

                <Col span={12} className="left">
                  <Statistic prefix="Total:" value={" "} />
                </Col>
                <Col span={12} className="right">
                  <Statistic prefix="$" precision={2} value={total} />
                </Col>

                <Col span={12} className="left">
                  <Statistic prefix="Cambio:" value={" "} />
                </Col>
                <Col span={12} className="right">
                  <Statistic
                    prefix="$"
                    precision={2}
                    value={
                      metodo === "tarjeta" || pago < total ? 0 : pago - total
                    }
                  />
                </Col>

                <Divider />
                <Col span={24}>
                  {showErrorPayment ? (
                    <Alert
                      type="error"
                      message={
                        "El monto recibido es menor que el total, por favor registra el pago completo."
                      }
                      banner
                    />
                  ) : (
                    ""
                  )}
                  <Statistic
                    prefix="Recibí: $"
                    precision={2}
                    value={pago ? pago : 0}
                  />
                  {metodo === "tarjeta" ? (
                    ""
                  ) : (
                    <Form.Item>
                      {getFieldDecorator("pago", {
                        rules: [
                          {
                            required: true,
                            message: "¿Cuanto pago el cliente?"
                          }
                        ]
                      })(
                        <InputNumber
                          min={0}
                          style={{ width: "100%" }}
                          onChange={value =>
                            this.setState({
                              pago: value,
                              showErrorPayment: false
                            })
                          }
                          size="large"
                          formatter={value =>
                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                          parser={value => value.replace(/\$\s?|(,*)/g, "")}
                        />
                      )}
                    </Form.Item>
                  )}
                </Col>
                <Col span={24}>
                  <Button
                    block
                    onClick={() => this.validatePay()}
                    type="primary"
                  >
                    Registrar Pago
                  </Button>
                </Col>
              </Row>
              <Divider />
              <Row gutter={20}>
                {/*/}<Col span={12}>
                  <ReactToPrint
                    trigger={() => (
                      <Button
                        block
                        disabled={disabledPrintButton}
                        onClick={() => this.openNotification("imprimir")}
                        type="primary"
                      >
                        Imprimir ticket
                      </Button>
                    )}
                    content={() => this.componentRef}
                  />
                </Col>
                {/*/}
              </Row>
            </Form>
          </Col>
          <Col span={24}>
            <div style={{ backgroundColor: "gray", padding: 10 }}>
              <Ticket
                metodo={metodo}
                salesman={vendedor}
                client={cliente}
                payment={pago}
                cambio={pago - total}
                descuento={discount}
                total={total}
                products={products}
                ref={el => (this.componentRef = el)}
                type="Venta"
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(ModalPayment);
