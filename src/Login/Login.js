import React from "react";
import { Form, Icon, Layout, Input, Button, Card, Row, Col } from "antd";
const { Header, Footer, Content } = Layout;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Login extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const usuarioError = isFieldTouched("usuario") && getFieldError("usuario");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <div
        style={{
          background: "#ECECEC",
          display: "table",
          height: "100%",
          width: "100%"
        }}
      >
        <div style={{ display: "table-cell", verticalAlign: "middle" }}>
          <Layout>
            <Header style={{ color: "white" }}>Point</Header>
            <Content>
              <Row
                style={{ marginTop: "15%", marginBottom: "15%" }}
                type="flex"
                justify="center"
              >
                <Col span={6}>
                  <Card title="Point" bordered={false}>
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                      <Row>
                        <Col span={24}>
                          <Form.Item
                            validateStatus={usuarioError ? "error" : ""}
                            help={usuarioError || ""}
                          >
                            {getFieldDecorator("usuario", {
                              rules: [
                                {
                                  required: true,
                                  message: "Por favor ingresa tu usuario."
                                }
                              ]
                            })(
                              <Input
                                prefix={
                                  <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                placeholder="Usuario"
                              />
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Form.Item
                            validateStatus={passwordError ? "error" : ""}
                            help={passwordError || ""}
                          >
                            {getFieldDecorator("password", {
                              rules: [
                                {
                                  required: true,
                                  message: "Por favor ingresa tu contraseña."
                                }
                              ]
                            })(
                              <Input
                                prefix={
                                  <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                type="password"
                                placeholder="Contraseña"
                              />
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              disabled={hasErrors(getFieldsError())}
                            >
                              Entrar
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Content>
            <Footer>Desarrollado por Ernesto Pacheco</Footer>
          </Layout>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: "horizontal_login" })(Login);
