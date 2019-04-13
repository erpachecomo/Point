import React from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Radio,
  Statistic,
  InputNumber,
  Divider,
  notification,
  Input,
  Typography,
  Alert
} from "antd";
import SearchInput from "../utils/SearchInput";
import toMXN from "../utils/Parser";
import Ticket from "./Ticket";
import ReactToPrint from "react-to-print";
const { Text } = Typography;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class ModalApartado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      metodo: "efectivo",
      pago: 0,
      showError: false,
      showErrorPayment: false,
      showErrorSalesman: false,
      showErrorClient: false,
      disabledPrintButton: true,
      showForm: false,
      nombreCliente: "",
      apellidosCliente: "",
      correoCliente: "",
      cliente: "",
      vendedor: "",
      clientes: [
        { text: "Mostrador", value: "0" },
        { text: "Martin", value: "1" },
        { text: "Maria", value: "2" },
        { text: "Alberto", value: "3" }
      ]
    };
  }
  handleChange = value => {
    console.log(value);
  };
  getClientes = () => {
    return this.state.clientes;
  };
  saveClient = () => {
    const {
      clientes,
      apellidosCliente,
      nombreCliente,
      correoCliente
    } = this.state;
    if (!apellidosCliente || !nombreCliente || !correoCliente) {
      this.openNotification("errorcliente");
      return;
    }
    this.setState({
      clientes: [
        ...clientes,
        { text: nombreCliente + " " + apellidosCliente, value: correoCliente }
      ]
    });
    this.openNotification("cliente");
  };

  validatePay = () => {
    const { pago, cliente, vendedor } = this.state;
    if (pago > 100 && vendedor && cliente) {
      this.openNotification("pago");
      this.setState({ disabledPrintButton: false });
      return;
    }
    if (pago <= 100)
      this.setState({ showErrorPayment: true, disabledPrintButton: true });
    if (!cliente)
      this.setState({ showErrorClient: true, disabledPrintButton: true });
    if (!vendedor)
      this.setState({ showErrorSalesman: true, disabledPrintButton: true });
    //this.setState({ disabledPrintButton: true });
  };
  openNotification = type => {
    const description = "Procede a imprimir el ticket";
    if (type === "error") this.setState({ showErrorPayment: true });
    else this.setState({ showErrorPayment: false });
    if (type === "errorcliente") this.setState({ showError: true });
    else this.setState({ showError: false });

    if (type === "cliente")
      notification.success({
        placement: "bottomLeft",
        message: "Cliente agregado correctamente",
        style: {
          width: 600,
          marginRight: 335 - 600
        }
      });
    if (type === "pago")
      notification.success({
        placement: "bottomLeft",
        message: "Apartado correcto",
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
    const { total, hideDrawer, visible, products, discount } = this.props;
    const {
      pago,
      metodo,
      disabledPrintButton,
      showForm,
      cliente,
      vendedor,
      clientes,
      showError,
      showErrorPayment,
      showErrorClient,
      showErrorSalesman
    } = this.state;
    return (
      <div>
        <Drawer
          title={`Apartar pedido`}
          placement="left"
          width={"50%"}
          onClose={() => hideDrawer()}
          visible={visible}
          style={{
            overflow: "auto",
            height: "calc(100% - 108px)",
            paddingBottom: "108px"
          }}
        >
          <Row>
            <Col span={12}>
              <Form layout="horizontal" hideRequiredMark>
                <Row gutter={16}>
                  {showErrorClient ? (
                    <Alert
                      type="error"
                      message={"Selecciona un cliente"}
                      banner
                    />
                  ) : (
                    ""
                  )}
                  <Col span={16}>
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
                          data={clientes}
                          handleSearch={cliente =>
                            this.setState({
                              cliente: "",
                              showErrorClient: false
                            })
                          }
                          handleChange={cliente =>
                            this.setState({ cliente, showErrorClient: false })
                          }
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Nuevo cliente">
                      <Button
                        block
                        onClick={() => this.setState({ showForm: true })}
                      >
                        Crear
                      </Button>
                    </Form.Item>
                  </Col>
                  {showForm ? (
                    <div>
                      <Divider>Datos del cliente</Divider>
                      <Col span={24}>
                        {showError ? (
                          <Alert
                            type="error"
                            message={"Por favor completa los datos del cliente"}
                            banner
                          />
                        ) : (
                          ""
                        )}
                        <Row type="flex" justify="space-around">
                          <Col span={11}>
                            <Text>Nombre:</Text>
                          </Col>
                          <Col span={11}>
                            <Text>Apellidos:</Text>
                          </Col>
                          <Col span={11}>
                            <Input
                              placeholder="Nombre del cliente"
                              onChange={e =>
                                this.setState({
                                  nombreCliente: e.target.value,
                                  showError: false
                                })
                              }
                            />
                          </Col>
                          <Col span={11}>
                            <Input
                              placeholder="Apellidos del cliente"
                              onChange={e => {
                                this.setState({
                                  apellidosCliente: e.target.value,
                                  showError: false
                                });
                              }}
                            />
                          </Col>
                          <Divider style={{ backgroundColor: "white" }} />
                          <Col span={23}>
                            <Text>Correo electrónico:</Text>
                          </Col>
                          <Col span={23}>
                            <Input
                              placeholder="Correo electrónico"
                              onChange={e =>
                                this.setState({
                                  correoCliente: e.target.value,
                                  showError: false
                                })
                              }
                            />
                          </Col>
                          <Divider style={{ opacity: 0 }} />

                          <Col span={23}>
                            <Button
                              block
                              type="primary"
                              onClick={() => this.saveClient()}
                            >
                              Guardar nuevo cliente
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <Divider style={{ opacity: 0 }} />
                      <Divider />
                    </div>
                  ) : (
                    ""
                  )}
                  <Col span={24}>
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
                            { text: "José", value: "1" },
                            { text: "Jesús", value: "2" },
                            { text: "Marcela", value: "3" }
                          ]}
                        />
                      )}
                    </Form.Item>
                    <Divider />
                    <Form.Item label="Método de pago para adelanto">
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
                          onChange={e =>
                            this.setState({ metodo: e.target.value })
                          }
                        >
                          <RadioButton value="efectivo">Efectivo</RadioButton>
                          <RadioButton value="tarjeta">
                            Tarjeta de Débito/Crédito
                          </RadioButton>
                        </RadioGroup>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Statistic prefix="Total: $" precision={2} value={total} />
                  </Col>
                  <Divider />
                  <Col span={24}>
                    {showErrorPayment ? (
                      <Alert
                        type="error"
                        message={
                          "El monto recibido es menor que el minimo para apartar, por favor registra el pago completo."
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
                    <Form.Item>
                      {getFieldDecorator("pago", {
                        rules: [
                          {
                            required: true,
                            message: "¿Cuanto dejó de apartado el cliente?"
                          }
                        ]
                      })(
                        <InputNumber
                          min={0}
                          style={{ width: "50%" }}
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
                    <Statistic
                      prefix="Pendiente: $"
                      precision={2}
                      value={total - pago}
                    />
                  </Col>
                </Row>
                <Divider />
                <Row gutter={20}>
                  <Col span={12}>
                    <Button
                      block
                      onClick={() => this.validatePay()}
                      type="primary"
                    >
                      Guardar Apartado
                    </Button>
                  </Col>
                  <Col span={12}>
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
                      pageStyle="@page { size: 80mm 297mm } @media print { body { -webkit-print-color-adjust: exact; } }"
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col offset={1} span={11}>
              <div style={{ backgroundColor: "gray", padding: 10 }}>
                <Ticket
                  metodo={metodo}
                  salesman={vendedor}
                  client={cliente}
                  payment={pago}
                  cambio={total - pago}
                  descuento={discount}
                  total={total}
                  products={products}
                  ref={el => (this.componentRef = el)}
                  type="Apartado"
                />
              </div>
            </Col>
          </Row>
        </Drawer>
      </div>
    );
  }
}

export default Form.create()(ModalApartado);
