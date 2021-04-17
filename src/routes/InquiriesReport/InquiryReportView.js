import React, { Component } from "react";
import PropTypes from "prop-types";
import alertify from "alertifyjs";

import { getSalesList, loadReportService } from "./InquiryReportController";

import TitleSectionField from "./../../components/TitleSeccionField/TitleSectionField.js";
import RadioButtonField from "./../../components/RadioButtonField/RadioButtonField.js";
import TextField from "./../../components/TextField/TextField.js";
import ButtonField from "./../../components/ButtonField/ButtonField";
import TableField from "./../../components/TableField/TableField.js";

class View extends Component {
  static propTypes = {
    city: PropTypes.string,
    interestedNameToSearch: PropTypes.string,
    inquiriesList: PropTypes.array,
    localInquiriesList: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.state = {
      city: this.props.city,
      interestedNameToSearch: this.props.interestedNameToSearch,
      inquiriesList: this.props.inquiriesList,
      localInquiriesList: this.props.localInquiriesList,
    };
    this.getInquiriesView = this.getInquiriesView.bind(this);
    this.onClickCity = this.onClickCity.bind(this);
    this.onSearchInterested = this.onSearchInterested.bind(this);
    this.loadReport = this.loadReport.bind(this);
  }

  static defaultProps = {
    city: "all",
    interestedNameToSearch: "",
    inquiriesList: [],
    localInquiriesList: [],
  };

  componentDidMount() {
    const storage = localStorage.getItem("userData");
    const dataStorage = JSON.parse(storage);
    if (!dataStorage) return this.props.history.push("/");
    if (!dataStorage.userId) return this.props.history.push("/");
    this.getInquiriesView();
  }

  getInquiriesView(filterCity = "all") {
    getSalesList(filterCity).then((resp) => {
      if (resp.status === 200) {
        this.setState({
          inquiriesList: resp.responseView,
          localInquiriesList: resp.responseView,
        });
      }
    });
  }

  onClickCity(idValue = "all") {
    this.setState({ city: idValue, interestedNameToSearch: "" });
    this.getInquiriesView(idValue);
  }

  onSearchInterested(value = "") {
    this.setState({ interestedNameToSearch: value });
    if (value === "") {
      this.setState({ inquiriesList: this.state.localInquiriesList });
    } else {
      const localDataSales = this.state.localInquiriesList;
      const filteredByInterestedName = localDataSales.filter((inquiry) => {
        if (inquiry.interestedName.toUpperCase().includes(value.toUpperCase()))
          return inquiry;
      });
      this.setState({ inquiriesList: filteredByInterestedName });
    }
  }

  loadReport() {
    loadReportService(this.state.city, this.state.interestedNameToSearch).then(
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
      "Cantidad de Solicitudes",
      "Ciudad",
      "Dirección",
      "Tipo",
      "Folio",
      "Precio de oferta",
      "Interesado",
      "Fecha de consulta",
    ];
    const headOrderTable = [
      "number",
      "totalByOffer",
      "city",
      "address",
      "description",
      "codeFolio",
      "offerPrice",
      "interestedName",
      "inquiryDate",
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
        <TitleSectionField texto={"Consultas Realizadas desde la App"} />
        <div className="row">
          <div className="col-md-8">
            <RadioButtonField
              ref={"filtercity"}
              tagComponent={"Filtro de consultas por Ciudad"}
              radiosList={radiosCityList}
              onClickRadio={this.onClickCity}
            />
          </div>
          <div className="col-md-4">
            <ButtonField
              enabled={this.state.inquiriesList.length > 0}
              type={"primary"}
              texto={"Generar Reporte"}
              onClick={this.loadReport}
            />
          </div>
        </div>

        <TextField
          idField={"interested"}
          tagComponent={"Buscar por Interesado"}
          placeholder={"Ingrese el Nombre del Interesado"}
          value={this.state.interestedNameToSearch}
          onChangeValue={this.onSearchInterested}
        />

        <TableField
          tagComponent={"Lista de las consultas Bienes"}
          head={headTable}
          headOrderTable={headOrderTable}
          data={this.state.inquiriesList}
          identificador={"inquiryId"}
        />
      </div>
    );
  }
}
export default View;
