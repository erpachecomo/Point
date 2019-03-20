import React from "react";

import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  AutoComplete,
  InputNumber
} from "antd";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const { Option } = Select;

class AddProductForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    linea: "",
    color: "",
    claves: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addProductToTable(values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleClaveChange = value => {
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { linea, color, claves } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="Clave">
              {getFieldDecorator("clave", {
                rules: [
                  {
                    type: "string",
                    message: "Por favor ingresa una clave de producto valida"
                  },
                  {
                    required: true,
                    message: "Por favor ingresa una clave de producto"
                  }
                ]
              })(
                <AutoComplete
                  dataSource={claves}
                  onChange={this.handleClaveChange}
                >
                  <Input />
                </AutoComplete>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Linea">
              {getFieldDecorator("linea", {
                rules: [
                  {
                    required: true,
                    message: "Por favor selecciona una linea"
                  }
                ]
              })(
                <Select
                  value={linea}
                  //size={size}
                  //style={{ width: "32%" }}
                  onChange={this.handleLineaChange}
                >
                  <Option value="rmb">RMB</Option>
                  <Option value="dollar">Dollar</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Corrida">
              {getFieldDecorator("corrida", {
                rules: [
                  {
                    required: true,
                    message: "Por favor selecciona una corrida"
                  }
                ]
              })(
                <Select
                  value={color}
                  //size={size}
                  onChange={this.handleLineaChange}
                >
                  <Option value="25.5">25.5</Option>
                  <Option value="26">26</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item label="Color">
              {getFieldDecorator("color", {
                rules: [
                  {
                    required: true,
                    message: "Por favor selecciona un color"
                  }
                ]
              })(
                <Select
                  value={color}
                  //size={size}
                  //
                  onChange={this.handleLineaChange}
                >
                  <Option value="Azul">Azul</Option>
                  <Option value="Rojo">Rojo</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={8}>
            <Form.Item label="Familia">
              {getFieldDecorator("familia", {
                rules: [
                  {
                    required: true,
                    message: "Por favor ingresa una familia",
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Precio">
              {getFieldDecorator("precio", {
                rules: [
                  {
                    type: "number",
                    message: "Por favor ingresa una precio valido"
                  },
                  { required: true, message: "Por favor selecciona un precio" }
                ]
              })(
                <InputNumber
                  defaultValue={0}
                  min={0}
                  style={{ width: "100%" }}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Pares">
              {getFieldDecorator("pares", {
                rules: [
                  {
                    type: "number",
                    message: "Por favor ingresa un par valido"
                  },
                  { required: true, message: "Por favor selecciona un par" }
                ]
              })(
                <InputNumber
                  defaultValue={1}
                  style={{ width: "100%" }}
                  min={1}
                  max={100}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={2}>
          <Col span={24}>
            <Form.Item label="Descripcion">
              {getFieldDecorator("descripcion", {
                rules: [
                  {
                    type: "string",
                    message: "Por favor ingresa una descripcion valida"
                  },
                  {
                    required: true,
                    message: "Por favor ingresa una descripcion"
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col span={12}>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Agregar producto
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button block type="danger">
                Limpiar campos
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedAddProductForm = Form.create({ name: "register" })(AddProductForm);

export default WrappedAddProductForm;
