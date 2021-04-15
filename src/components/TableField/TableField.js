/**
 * Created by Williams on 22/2/2020.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

import ContentTable from "./ContentTable.js";

//Seccion que importa los estilos del componente
import "./TableField.scss";

class TableField extends Component {
  /*
   * TODO importante explicacion del componente
   * visible-> bool que muestra u oculta el componente
   * tagComponent-> Etiqueta para el componente (ej. mi lista favorita)
   * head->array de strings con el nombre que tendran las cabeceras
   * data->array de datos que renderizara dinamicamente, importante que cuando se traiga
   *       una lista se debe coincidir con el 'identificador' ya que la propiedad con este
   *       nombre sera ocultado y ese valor sera devuelto al padre para su update o delete
   *       segun sea el caso.
   * headOrderTable -> The same data of data but with name of them properties by item (object).
   * identificador->estado que manejara por detras de la tabla el nombre de la propiedad de la
   *                lista en 'data', ademas de ocultar todos los items que corresponda a esa
   *                propiedad en la lista, por decir, identificador='id_use', los valores de la
   *                lista que esten en la propiedad seran ocultos.
   * forUpdate-> bool que oculta o muestra la columna editar
   * forDelete-> bool que oculta o muestra la columna eliminar
   * onClickItem->retorna a la funcion indicada en el padre el valor del 'identificador' del item
   *              seleccionado. Y el tipo de accion (update, delete).
   * */

  static propTypes = {
    head: PropTypes.array,
    data: PropTypes.array,
    visible: PropTypes.bool,
    identificador: PropTypes.string,
    forUpdate: PropTypes.bool,
    forDelete: PropTypes.bool,
    tagComponent: PropTypes.string,
    onClickItem: PropTypes.func,
    headOrderTable: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      head: this.props.head,
      visible: this.props.visible,
      identificador: this.props.identificador,
      forUpdate: this.props.forUpdate,
      forDelete: this.props.forDelete,
      tagComponent: this.props.tagComponent,
      onClickItem: this.props.onClickItem,
      headOrderTable: this.props.headOrderTable,
    };
    // bindeo para funciones y metodos
    this.armarCabecera = this.armarCabecera.bind(this);
    this.armarContenido = this.armarContenido.bind(this);
    this.handleItem = this.handleItem.bind(this);
  }

  static defaultProps = {
    head: [],
    data: [],
    visible: true,
    identificador: "",
    forUpdate: false,
    forDelete: false,
    tagComponent: "",
    headOrderTable: [],
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
    if (nextProps.forUpdate !== null) {
      if (nextProps.forUpdate) {
        this.setState({ forUpdate: true });
      } else {
        this.setState({ forUpdate: false });
      }
    }
    if (nextProps.forDelete !== null) {
      if (nextProps.forDelete) {
        this.setState({ forDelete: true });
      } else {
        this.setState({ forDelete: false });
      }
    }
    if (nextProps.head !== null) {
      this.setState({ head: nextProps.head });
    }
    if (nextProps.data !== null) {
      this.setState({ data: nextProps.data });
    }
    if (nextProps.headOrderTable !== null) {
      this.setState({ headOrderTable: nextProps.headOrderTable });
    }
    if (nextProps.onClickItem !== null) {
      this.setState({ onClickItem: nextProps.onClickItem });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('shouldComponentUpdateComponent', nextProps, nextState)
    return true;
  }

  armarCabecera() {
    // console.log('armarCabecera', this.props.head)
    let forHead = this.state.head;
    if (this.state.forUpdate) {
      forHead.push("Editar");
    }
    if (this.state.forDelete) {
      forHead.push("Eliminar");
    }
    let head = forHead.map((itemH, numH) => {
      return (
        <th key={numH} scope="col">
          {itemH}
        </th>
      );
    });
    return head;
  }

  armarContenido() {
    return (
      <ContentTable
        identificadorUnico={this.state.identificador}
        listaContenido={this.state.data}
        headOrderTable={this.state.headOrderTable}
        forUpdate={this.state.forUpdate}
        forDelete={this.state.forDelete}
        onClickItemTable={this.handleItem}
      />
    );
  }

  handleItem(val, action) {
    // console.log("handleItem", val, action);
    if (
      this.state.onClickItem !== null &&
      this.state.onClickItem !== undefined
    ) {
      this.state.onClickItem(val, action);
    }
  }

  render() {
    // console.log('renderComponent')
    if (this.state.data.length > 0) {
      return (
        <div hidden={!this.state.visible} className="table-responsive-md">
          <div className="tag-comp-table">
            <span className="tag-table">{this.props.tagComponent}</span>
          </div>
          <table className="table table-hover table-condensed table-bordered table-especific">
            <thead className="thead-dark">
              <tr>{this.armarCabecera()}</tr>
            </thead>
            <tbody>{this.armarContenido()}</tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="tag-comp-table">
          <span className="tag-table">{"Sin Resultados"}</span>
        </div>
      );
    }
  }
}
export default TableField;
