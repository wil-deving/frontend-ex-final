/**
 * Created by Williams on 18/2/2020.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

//Seccion que importa los estilos del componente
import "./TextField.scss";

class TextField extends Component {
  /*TODO estados y propiedades del componente*/
  /*
   * visible-> bool que muestra u oculta el componente
   * tagComponent-> string que muestra el texto que sobre el campo (label)
   * enabled-> bool que habilita o no el componente
   * value-> valor que pondra en user
   * isRequired-> tipo de entrada para los estilos (obligatorio o no)
   * placeholder-> prop que se pondra en el campo para que empiece
   * */

  static propTypes = {
    tagComponent: PropTypes.string,
    visible: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isRequired: PropTypes.bool,
    enabled: PropTypes.bool,
    onChangeValue: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      tagComponent: this.props.tagComponent,
      visible: this.props.visible,
      value: this.props.value,
      placeholder: this.props.placeholder,
      isRequired: this.props.isRequired,
      enabled: this.props.enabled,
      onChangeValue: this.props.onChangeValue,
    };
    // bindeo para funciones y metodos
    this.onChangeField = this.onChangeField.bind(this);
  }

  static defaultProps = {
    tagComponent: "",
    visible: true,
    value: "",
    placeholder: "",
    isRequired: false,
    enabled: true,
  };

  componentWillMount() {
    //console.log('componentWillMountComponent')
  }

  componentDidMount() {
    //console.log('componentDidMountComponent')
  }

  componentWillReceiveProps(nextProps) {
    //console.log('componentWillReceiveProps', nextProps)
    if (nextProps.visible !== null) {
      if (nextProps.visible) {
        this.setState({ visible: true });
      } else {
        this.setState({ visible: false });
      }
    }
    if (
      nextProps.onChangeValue !== undefined &&
      nextProps.onChangeValue !== null
    ) {
      this.setState({ onChangeValue: nextProps.onChangeValue });
    }
    if (nextProps.value !== undefined && nextProps.value !== null) {
      this.setState({ value: nextProps.value });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('shouldComponentUpdateComponent', nextProps, nextState)
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('componentWillUpdateComponent', nextProps, nextState)
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdateComponent', prevProps, prevState)
  }

  componentWillUnmount() {
    //console.log('componentWillUnmountComponent')
  }

  onChangeField() {
    // console.log('onChangeField', this.props.idField)
    let valor = document.getElementById(this.props.idField).value;
    this.setState({ value: valor });
    if (
      this.state.onChangeValue !== undefined &&
      this.state.onChangeValue !== null
    ) {
      this.state.onChangeValue(valor);
    }
    if (valor !== "") this.setState({ isRequired: false });
    else {
      if (this.props.isRequired) this.setState({ isRequired: true });
    }
  }

  render() {
    let req = this.state.isRequired ? "is-req" : "no-req";

    console.log("OOOOO", this.state);

    return (
      <div hidden={!this.state.visible} className="general-text">
        {this.props.tagComponent !== "" ? (
          <label
            htmlFor={this.props.idField}
            className={"general-comp general-label"}
          >
            {this.props.tagComponent}
          </label>
        ) : null}

        <input
          className={
            this.state.type +
            " general-comp general-textfield " +
            req +
            " border-text"
          }
          id={this.props.idField}
          type="text"
          value={this.state.value}
          placeholder={this.props.placeholder}
          disabled={!this.state.enabled}
          onChange={this.onChangeField}
        />

        {this.state.isRequired ? (
          <div className="cont-required">
            <span id="req">Obligatorio</span>
          </div>
        ) : null}
      </div>
    );
  }
}
export default TextField;
