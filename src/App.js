import React from "react";
import Home from "./Home";
import Login from "./Login/Login";

import "./styles.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: false
    };
  }
  getUsers = () => {
    return [
      { nombre: "Ernesto", usuario: "epm", password: "abc123" },
      { nombre: "Ernesto", usuario: "epu", password: "abc12" }
    ];
  };

  handleSubmit = values => {
    const users = this.getUsers();

    const filtered = users.filter(
      value =>
        value.usuario === values.usuario && value.password === values.password
    );
    if (filtered.length === 1) {
      sessionStorage.setItem("usuario", filtered[0]);
      this.setState({ user: true });
    }
  };

  render() {
    const usuario = sessionStorage.getItem("usuario");
    const user = this.state.user;
    const content = !user ? (
      <Home usuario={usuario} />
    ) : (
      <Login handleSubmit={this.handleSubmit} />
    );
    return <div className="App">{content}</div>;
  }
}

export default App;
