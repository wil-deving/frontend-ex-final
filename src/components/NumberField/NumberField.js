/**
 * Created by Williams on 9/3/2020.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

//Seccion que importa los estilos del componente
import "./NumberField.scss";

class MiComponente extends Component {
  /*TODO estados y propiedades del componente*/
  /*
   * visible-> bool que muestra u oculta el componente
   * tagComponent-> string que muestra el texto que sobre el campo (label)
   * enabled-> bool que habilita o no el componente
   * value-> valor que pondra en user
   * defaultValue-> valor numerico con el cual iniciara el componente
   * tagValue->string que dira que queremos cuantificar (c.c., autos ,personas, etc)
   * */

  static propTypes = {
    tagComponent: PropTypes.string,
    visible: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    enabled: PropTypes.bool,
    defaultValue: PropTypes.number,
    tagValue: PropTypes.string,
    onChangeValue: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      tagComponent: this.props.tagComponent,
      visible: this.props.visible,
      value: this.props.value,
      enabled: this.props.enabled,
      defaultValue: this.props.defaultValue,
      tagValue: this.props.tagValue,
      onChangeValue: this.props.onChangeValue,
    };
    // bindeo para funciones y metodos
    this.onChangeField = this.onChangeField.bind(this);
  }

  static defaultProps = {
    tagComponent: "",
    visible: true,
    value: "",
    enabled: true,
    defaultValue: 1,
    tagValue: "",
  };

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

  onChangeField() {
    // console.log('onChangeField', this.props)
    let valor = document.getElementById(this.props.idField).value;
    // console.log('CambioNumberField', valor)
    this.setState({ value: valor });
    if (
      this.state.onChangeValue !== undefined &&
      this.state.onChangeValue !== null
    ) {
      this.state.onChangeValue(valor);
    }
  }

  render() {
    // console.log('renderComponentNumberField', this)
    return (
      <div hidden={!this.state.visible} className="general-number">
        {this.props.tagComponent !== "" ? (
          <label
            htmlFor={this.props.idField}
            className={"general-comp-num general-label-num"}
          >
            {this.props.tagComponent}
          </label>
        ) : null}

        <input
          className={" general-comp-num general-number-field border-num"}
          id={this.props.idField}
          type="number"
          value={this.state.value}
          placeholder={this.props.placeholder}
          disabled={!this.state.enabled}
          onChange={this.onChangeField}
        />
        <span id="t-val">{this.props.tagValue}</span>
      </div>
    );
  }
}
export default MiComponente;
