import React, { Component } from "react";
import PropTypes from "prop-types";
import alertify from "alertifyjs";

import { getSalesList, loadReportService } from "./SalesReportController";

import TitleSectionField from "./../../components/TitleSeccionField/TitleSectionField.js";
import RadioButtonField from "./../../components/RadioButtonField/RadioButtonField.js";
import TextField from "./../../components/TextField/TextField.js";
import ButtonField from "./../../components/ButtonField/ButtonField";
import TableField from "./../../components/TableField/TableField.js";

class View extends Component {
  static propTypes = {
    city: PropTypes.string,
    agentNameToSearch: PropTypes.string,
    salesList: PropTypes.array,
    localSalesList: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      city: this.props.city,
      agentNameToSearch: this.props.agentName,
      salesList: this.props.salesList,
      localSalesList: this.props.localSalesList,
    };
    this.getSalesView = this.getSalesView.bind(this);
    this.onClickCity = this.onClickCity.bind(this);
    this.onSearchAgent = this.onSearchAgent.bind(this);
    this.loadReport = this.loadReport.bind(this);
  }

  static defaultProps = {
    city: "all",
    agentNameToSearch: "",
    salesList: [],
    localSalesList: [],
  };

  componentDidMount() {
    this.getSalesView();
  }

  getSalesView(filterCity = "all") {
    getSalesList(filterCity).then((resp) => {
      if (resp.status === 200) {
        this.setState({
          salesList: resp.responseView,
          localSalesList: resp.responseView,
        });
      }
    });
  }

  onClickCity(idValue = "all") {
    this.setState({ city: idValue, agentNameToSearch: "" });
    this.getSalesView(idValue);
  }

  onSearchAgent(value = "") {
    this.setState({ agentNameToSearch: value });
    if (value === "") {
      this.setState({ salesList: this.state.localSalesList });
    } else {
      const localDataSales = this.state.localSalesList;
      const filteredByAgentName = localDataSales.filter((sale) => {
        if (sale.agentName.toUpperCase().includes(value.toUpperCase()))
          return sale;
      });
      this.setState({ salesList: filteredByAgentName });
    }
  }

  loadReport() {
    console.log("YYYY", this.state);
    loadReportService(this.state.city, this.state.agentNameToSearch).then(
      (resp) => {
        if (resp.status === 200)
          alertify.success("Reporte generado exitosamente");
        else alertify.error("Error genearando Reporte");
      }
    );
  }

  render() {
    const headTable = [
      "Nro.",
      "Ciudad",
      "Dirección",
      "Tipo",
      "Folio",
      "Propietario",
      "Agente",
      "Precio catastral",
      "Precio de oferta",
      "Precio de venta",
      "Fecha de oferta",
      "Fecha de venta",
    ];
    const headOrderTable = [
      "number",
      "city",
      "address",
      "description",
      "codeFolio",
      "costumerName",
      "agentName",
      "priceCatastral",
      "offerPrice",
      "salePrice",
      "offerDate",
      "saleDate",
    ];
    const radiosCityList = [
      {
        id: "all",
        tag: "Todas las ciudades",
        value: "all",
        group: "cities",
        activo: true,
      },
      { id: "La Paz", tag: "La Paz", value: "La Paz", group: "cities" },
      {
        id: "Cochabamba",
        tag: "Cochabamba",
        value: "Cochabamba",
        group: "cities",
      },
      {
        id: "Santa Cruz",
        tag: "Santa Cruz",
        value: "Santa Cruz",
        group: "cities",
      },
    ];

    return (
      <div>
        <TitleSectionField texto={"Ventas Realizadas"} />
        <div className="row">
          <div className="col-md-8">
            <RadioButtonField
              ref={"filtercity"}
              tagComponent={"Filtro de ventas por Ciudad"}
              radiosList={radiosCityList}
              onClickRadio={this.onClickCity}
            />
          </div>
          <div className="col-md-4">
            <ButtonField
              enabled={this.state.salesList.length > 0}
              type={"primary"}
              texto={"Generar Reporte"}
              onClick={this.loadReport}
            />
          </div>
        </div>

        <TextField
          idField={"agent"}
          tagComponent={"Buscar por agente"}
          placeholder={"Ingrese el Nombre del Agente"}
          value={this.state.agentNameToSearch}
          onChangeValue={this.onSearchAgent}
        />

        <TableField
          tagComponent={"Lista de Bienes Vendidos"}
          head={headTable}
          headOrderTable={headOrderTable}
          data={this.state.salesList}
          identificador={"saleId"}
        />
      </div>
    );
  }
}
export default View;
