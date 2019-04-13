import React from "react";

import "antd/dist/antd.css";
//import "./CartList.css";

import { Typography, Row, Col, Divider, Table, Statistic } from "antd";
import toMXN from "../utils/Parser";
import { today, hora } from "../utils/Datetime";

const { Title } = Typography;

class Ticket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      products,
      total,
      descuento,
      payment,
      cambio,
      salesman,
      client,
      metodo,
      type
    } = this.props;
    const columns = [
      { title: "Clave", dataIndex: "clave" },
      { title: "Pares", dataIndex: "pares" },
      { title: "P. Unit.", dataIndex: "precio" },
      { title: "Importe", dataIndex: "importe" }
    ];
    const totalMXN = toMXN(total);
    const descuentoMXN = toMXN(descuento);
    const paymentMXN = toMXN(payment);
    const cambioMXN = toMXN(cambio);

    const data = products.map(product => {
      const importe = toMXN(product.precio * product.pares);
      const precio = toMXN(product.precio);
      return {
        key: product.clave,
        clave: product.clave,
        pares: product.pares,
        precio,
        importe
      };
    });
    const iva = toMXN(total * 0.16);
    const subtotal = toMXN(total * 0.84);
    return (
      <div style={{ backgroundColor: "white" }}>
        <Row
          style={{ textAlign: "center", backgroundColor: "white" }}
          type="flex"
          justify="space-around"
          align="middle"
        >
          <Col span={24}>
            <img
              style={{
                width: 100,
                height: 100,
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              alt="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png"
            />
            <Title level={4}>My store</Title>
            <p>
              RFC: 132456789
              <br />
              Dirección: Av. Acueducto 2100, Colinas de San Javier, 45110
              Guadalajara, Jal.
              <br />
              Teléfono: 123 456 789
            </p>
          </Col>
        </Row>
        <Divider dashed orientation="left">
          Datos de ticket
        </Divider>
        <Row style={{ backgroundColor: "white" }}>
          <Col span={22} offset={1}>
            <p>
              Ticket: 132456789
              <br />
              Tipo: {type}
              <br />
              Fecha: {today}
              <br />
              Hora: {hora}
              <br />
              Cliente: {client}
              <br />
              Atendió: {salesman}
            </p>
          </Col>
        </Row>
        <Divider dashed orientation="left">
          Datos de compra
        </Divider>
        <Row style={{ backgroundColor: "white" }}>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={data}
              size="small"
              pagination={{ position: "none" }}
            />
            <div
              style={{
                backgroundColor: "white",
                margin: 10,
                textAlign: "right"
              }}
            >
              <p>
                {`Subtotal: ${subtotal}`}
                <br />
                {`IVA (16%): ${iva}`}
                <br />
                {`Descuento: ${descuentoMXN}`}
              </p>
              <p style={{ fontWeight: "bold" }}>{`Total: ${totalMXN}`}</p>
              <Divider dashed />
              <p>{`Pago con ${metodo}: ${paymentMXN}`}</p>
              <p style={{ fontWeight: "bold" }}>{`${
                type === "Venta" ? "Cambio" : "Pendiente"
              }: ${cambioMXN}`}</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Ticket;
