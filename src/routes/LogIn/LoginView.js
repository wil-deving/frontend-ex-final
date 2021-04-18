import React, { Component } from "react";
import PropTypes from "prop-types";
import alertify from "alertifyjs";

import { loginController } from "./LoginController";

import TitleSectionField from "./../../components/TitleSeccionField/TitleSectionField.js";
import TextField from "./../../components/TextField/TextField.js";
import ButtonField from "./../../components/ButtonField/ButtonField.js";

import "./Login.scss";

import AppContext from "./../../routes/ContextApp";

class Login extends Component {
  static contextType = AppContext;
  static propTypes = {
    userName: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pass: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  constructor(...props) {
    super(...props);
    this.state = {
      userName: this.props.userName,
      pass: this.props.pass,
    };
    this.login = this.login.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  static defaultProps = {
    userName: "",
    pass: "",
  };

  componentDidMount() {
    const storage = localStorage.getItem("userData");
    const dataStorage = JSON.parse(storage);
    if (dataStorage) {
      if (dataStorage.userId) {
        return this.props.history.push("/");
      }
    }
  }

  validateFields() {
    if (this.state.userName === "" || this.state.userName === null) {
      alertify.warning("Campo usuario debe ser llenado");
      return false;
    }
    if (this.state.pass === "" || this.state.pass === null) {
      alertify.warning("Campo password debe ser llenado");
      return false;
    }
    return true;
  }

  login() {
    if (this.validateFields()) {
      const { userName, pass } = this.state;
      const dataToSave = {
        user: userName,
        pass,
      };
      loginController(dataToSave).then((resp) => {
        if (resp.status === 200) {
          const authResponse = resp.body;
          const appDataContext = this.context;
          appDataContext.isAuth = authResponse.auth;
          appDataContext.user = authResponse.userData;
          if (authResponse.auth) {
            alertify.success(authResponse.message);
            localStorage.setItem(
              "userData",
              JSON.stringify(authResponse.userData)
            );
            window.location.reload();
          } else {
            alertify.warning(authResponse.message);
            localStorage.setItem("userData", null);
          }
        } else {
          console.log("Error to login");
        }
      });
    }
  }

  render() {
    return (
      <div className="contenedor">
        <TitleSectionField texto={"Inicio de Sesión"} />

        <TextField
          idField={"user"}
          tagComponent={"Usuario"}
          placeholder={"Ingrese el nro. De teléfono"}
          value={this.state.userName}
          onChangeValue={(value) => this.setState({ userName: value })}
        />

        <TextField
          idField={"pass"}
          tagComponent={"Password"}
          placeholder={"Ingrese el nro. De teléfono"}
          value={this.state.pass}
          onChangeValue={(value) => this.setState({ pass: value })}
        />

        <ButtonField
          type={"primary"}
          texto={"Iniciar Sesión"}
          onClick={this.login}
        />
      </div>
    );
  }
}
export default Login;
