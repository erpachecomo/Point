import React from "react";
import { PageHeader, Affix, Layout, Menu, Icon } from "antd";

import Inventory from "./inventory/Inventory";
import Sales from "./Sales/Sales";
import SalesHeader from "./Sales/Header";
import Users from "./Users/Users";

import "./styles.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import SubMenu from "antd/lib/menu/SubMenu";

const { Header, Sider, Content } = Layout;

class Home extends React.Component {
  state = {
    collapsed: false,
    bottom: 10,
    selected: "Ventas"
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { selected } = this.state;
    const content =
      selected === "Ventas" ? (
        <Sales />
      ) : selected === "Usuarios" ? (
        <Users />
      ) : selected === "Facturación" ? (
        <Users />
      ) : (
        <Inventory />
      );
    return (
      <Layout
        ref={node => {
          this.container = node;
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item
              className="left"
              key="1"
              onClick={() => this.setState({ selected: "Ventas" })}
            >
              <Icon type="dollar" />
              <span>Ventas</span>
            </Menu.Item>
            <SubMenu
              className="left"
              key="sub1"
              title={
                <span>
                  <Icon type="barcode" />
                  <span>Inventario</span>
                </span>
              }
            >
              <Menu.Item
                onClick={() =>
                  this.setState({ selected: "Inventario de Articulos" })
                }
                key="2"
                className="left"
              >
                Articulos
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  this.setState({ selected: "Inventario de Colores" })
                }
                key="3"
                className="left"
              >
                Colores
              </Menu.Item>
              <Menu.Item
                className="left"
                onClick={() =>
                  this.setState({ selected: "Inventario de Corridas y tallas" })
                }
                key="4"
              >
                Corridas y tallas
              </Menu.Item>
              <Menu.Item
                className="left"
                onClick={() =>
                  this.setState({ selected: "Inventario de Familias" })
                }
                key="5"
              >
                Familias
              </Menu.Item>
              <Menu.Item
                className="left"
                onClick={() =>
                  this.setState({ selected: "Inventario de Proveedores" })
                }
                key="6"
              >
                Proveedores
              </Menu.Item>
              <Menu.Item
                className="left"
                onClick={() =>
                  this.setState({ selected: "Inventario de Clientes" })
                }
                key="7"
              >
                Clientes
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              className="left"
              key="8"
              onClick={() => this.setState({ selected: "Usuarios" })}
            >
              <Icon type="user" />
              <span>Usuarios</span>
            </Menu.Item>
            <Menu.Item
              className="left"
              key="9"
              onClick={() => this.setState({ selected: "Facturación" })}
            >
              <Icon type="audit" />
              <span>Facturación</span>
            </Menu.Item>
            <Menu.Item
              className="left"
              key="10"
              onClick={() => this.setState({ selected: "Reportes" })}
            >
              <Icon type="line-chart" />
              <span>Reportes</span>
            </Menu.Item>
            <Menu.Item
              className="left"
              key="11"
              onClick={() => this.setState({ selected: "Tickets" })}
            >
              <Icon type="snippets" />
              <span>Tickets</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: "#fff", padding: 0 }}>
            {selected === "Ventas" ? (
              <SalesHeader />
            ) : (
              <PageHeader title={selected} />
            )}
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            {content}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
