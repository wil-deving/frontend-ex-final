/**
 * Created by Williams on 6/3/2020.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

//Seccion que importa los estilos del componente
import "./RadioButtonField.scss";

class MiComponente extends Component {
  /*TODO estados y propiedades del componente*/
  /*
   * visible-> bool que muestra u oculta el componente
   * tagComponent-> string que muestra el texto general que sobre el campo (label)
   * enabled-> bool que habilita o no el componente
   * value-> string que devuelve el radio seleccionado por el user
   * radiosList-> array con el siguiente formatao
   * todo solo uno debe estar activo ya que es un radio
   * todo [{ id: 'rad1', tag: 'radio 1', value: 'radioUno', group: 'grupoUno' }, { id: 'rad2', tag: 'radio 2', value: 'radioDos', group: 'grupoUno', activo: true }]
   * onClickRadio-> funcion que retorna al padre el valor seleccionado
   * */

  static propTypes = {
    visible: PropTypes.bool,
    enabled: PropTypes.bool,
    tagComponent: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    radiosList: PropTypes.array,
    onClickRadio: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      enabled: this.props.enabled,
      tagComponent: this.props.tagComponent,
      value: this.props.value,
      radiosList: this.props.radiosList,
      onClickRadio: this.props.onClickRadio,
    };
    // bindeo para funciones y metodos
    this.armarRadios = this.armarRadios.bind(this);
    this.onClickedRadio = this.onClickedRadio.bind(this);
  }

  static defaultProps = {
    visible: true,
    enabled: true,
    tagComponent: "Lista Radios",
    value: "",
    radiosList: [],
  };

  componentWillMount() {
    // console.log('componentWillMountComponent', this.props.radiosList)
    let forVal = "";
    for (let i in this.props.radiosList) {
      if (
        this.props.radiosList[i].activo !== undefined &&
        this.props.radiosList[i].activo !== null
      ) {
        forVal = this.props.radiosList[i].value;
      }
    }
    this.setState({ value: forVal });
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceivePropsRadio', nextProps)
    if (nextProps.visible !== null) {
      if (nextProps.visible) {
        this.setState({ visible: true });
      } else {
        this.setState({ visible: false });
      }
    }
    if (nextProps.radiosList !== null && nextProps.radiosList !== undefined) {
      this.setState({ radiosList: nextProps.radiosList });
    }
    if (
      nextProps.onClickRadio !== undefined &&
      nextProps.onClickRadio !== null
    ) {
      this.setState({ onClickRadio: nextProps.onClickRadio });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('shouldComponentUpdateComponent', nextProps, nextState)
    return true;
  }

  armarRadios() {
    let radios = this.props.radiosList.map((itemR, numR) => {
      let active = false;
      if (itemR.activo !== undefined && itemR.activo !== null) {
        active = true;
      }
      return (
        <div key={numR} className="item-lbl-radio">
          <label htmlFor={itemR.id} className={"tag-itemR"}>
            {itemR.tag}
          </label>
          <input
            id={itemR.id}
            type="radio"
            name={itemR.group}
            value={itemR.value}
            defaultChecked={active}
            disabled={!this.state.enabled}
            onClick={() => this.onClickedRadio(itemR.id, itemR.value)}
          />
        </div>
      );
    });
    return radios;
  }

  onClickedRadio(id, val) {
    // console.log('onClickedRadio', id, val, this.state.onClickRadio)
    if (
      this.state.onClickRadio !== null &&
      this.state.onClickRadio !== undefined
    ) {
      this.state.onClickRadio(id, val);
    }
    this.setState({ value: val });
  }

  render() {
    // console.log('renderComponentRadio')
    if (this.props.radiosList.length > 0) {
      return (
        <div className="general-radios" hidden={!this.state.visible}>
          <div>
            <span className="general-tagR general-radio-comp">
              {this.props.tagComponent}
            </span>
          </div>
          {this.armarRadios()}
        </div>
      );
    } else {
      return (
        <div className="general-radios">
          <span className="general-tagR">{"Sin Radios"}</span>
        </div>
      );
    }
  }
}
export default MiComponente;
