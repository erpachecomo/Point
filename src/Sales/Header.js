import React from "react";
import { Row, Col, Divider } from "antd";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];
    const weekdays = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado"
    ];
    const date = new Date();
    const today =
      weekdays[date.getDay()] +
      ", " +
      date.getDate() +
      " de " +
      months[date.getMonth()] +
      " del " +
      date.getFullYear();

    return (
      <div>
        <Row className="background-blue">
          {" "}
          <Col span={6}>
            <h2>
              <b>Fecha</b>
            </h2>
          </Col>
          <Col span={6}>
            <h2>
              <b>Turno</b>
            </h2>
          </Col>
          <Col span={6}>
            <h2>
              <b>Ticket</b>
            </h2>
          </Col>
          <Col span={6}>
            <h2>
              <b>Cliente</b>
            </h2>
          </Col>
        </Row>
        <Row className="background-blue">
          <Col span={6}>
            <h3>{today}</h3>
          </Col>
          <Col span={6}>
            <h3>1</h3>
          </Col>
          <Col span={6}>
            <h3>00123456</h3>
          </Col>
          <Col span={6}>
            <h3>Mostrador</h3>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
