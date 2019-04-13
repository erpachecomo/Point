import React from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Typography,
  Button,
  AutoComplete,
  Checkbox
} from "antd";

const { Option } = Select;
const { Text } = Typography;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    rfc: "",
    nss: "",
    tipo: "",
    usuario: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };
  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      autoCompleteResult,
      nombre,
      apellidos,
      tipo,
      correo,
      telefono,
      rfc,
      nss
    } = this.state;

    return (
      <Form className="left" onSubmit={this.handleSubmit}>
        <Row gutter={20}>
          <Col xs={24} sm={12} md={12} lg={3}>
            <Form.Item label="Nombre">
              {getFieldDecorator("nombre", {
                rules: [
                  {
                    required: true,

                    message: "Por favor pon el nombre del empleado.",
                    whitespace: true
                  }
                ],
                setFieldsValue: nombre
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Form.Item label="Apellidos">
              {getFieldDecorator("apellidos", {
                rules: [
                  {
                    required: true,
                    message: "Por favor pon los apellidos del empleado.",
                    whitespace: true
                  }
                ],
                setFieldsValue: apellidos
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6}>
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ],
                setFieldsValue: correo
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col lg={3} xs={24} md={12} sm={12}>
            <Form.Item label="Teléfono">
              {getFieldDecorator("telefono", {
                rules: [
                  {
                    type: "tel",
                    message: "Ingresa un teléfono valido"
                  },
                  {
                    required: true,
                    message: "Por favor ingresa un teléfono de contacto"
                  }
                ],
                setFieldsValue: telefono
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col lg={6} xs={24} md={12} sm={12}>
            <Form.Item label="RFC">
              {getFieldDecorator("rfc", {
                rules: [
                  {
                    required: true,
                    message: "Por favor ingresa un RFC"
                  }
                ],
                setFieldsValue: rfc
              })(
                <Input onChange={e => this.setState({ rfc: e.target.value })} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col lg={6} xs={24} md={12} sm={12}>
            <Form.Item label="NSS">
              {getFieldDecorator("nss", {
                rules: [
                  {
                    required: true,
                    message: "Por favor ingresa un Numero de Seguridad Social"
                  }
                ],
                setFieldsValue: nss
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col lg={12} xs={24} md={12} sm={12}>
            <Form.Item label="Permisos de usuario">
              {getFieldDecorator("checkbox-group", {
                initialValue: ["Ventas"]
              })(
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row>
                    <Col span={8}>
                      <Checkbox value="Ventas">Ventas</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="Inventarios">Inventarios</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="Usuarios">Usuarios</Checkbox>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Checkbox value="Facturacion">Facturación</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="Reportes">Reportes</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="Tickets">Tickets</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              )}
            </Form.Item>
          </Col>

          <Col lg={6} xs={24} md={12} sm={12}>
            <Text>{`Usuario: ${rfc.length > 4 ? rfc.substr(0, 4) : "-"}`}</Text>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={6}>
            <Form.Item label="Password">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input type="password" />)}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Confirm Password">
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Añadir usuario
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const AddUserForm = Form.create({ name: "register" })(RegistrationForm);

export default AddUserForm;
