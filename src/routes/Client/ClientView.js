import React, { Component } from "react";
import PropTypes from "prop-types";
import alertify from "alertifyjs";

import {
  getCostumerList,
  save,
  getCostumerData,
  update,
  deleteCostumer,
} from "./ClientController";

import TitleSectionField from "./../../components/TitleSeccionField/TitleSectionField.js";
import SelectListField from "./../../components/SelectListField/SelectListField.js";
import TextField from "./../../components/TextField/TextField.js";
import ButtonField from "./../../components/ButtonField/ButtonField.js";
import TableField from "./../../components/TableField/TableField.js";

class View extends Component {
  static propTypes = {
    costumerId: PropTypes.string,
    peopleId: PropTypes.string,
    costumerName: PropTypes.string,
    costumerPaterno: PropTypes.string,
    costumerMaterno: PropTypes.string,
    costumerDocumento: PropTypes.string,
    costumerExpDoc: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    costumerAddress: PropTypes.string,
    costumerPhone: PropTypes.string,
    costumerCellphone: PropTypes.string,
    costumerEmail: PropTypes.string,
    costumerList: PropTypes.array,
    actionForm: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      costumerId: this.props.costumerId,
      peopleId: this.props.peopleId,
      costumerName: this.props.clientName,
      costumerPaterno: this.props.clientPaterno,
      costumerMaterno: this.props.clientMaterno,
      costumerDocumento: this.props.clientDocumento,
      costumerExpDoc: this.props.clientExpDoc,
      costumerAddress: this.props.clientAddress,
      costumerPhone: this.props.clientPhone,
      costumerCellphone: this.props.clientCellphone,
      costumerEmail: this.props.clientEmail,
      costumerList: this.props.clientList,
      actionForm: this.props.actionForm,
    };
    this.getCostumerListView = this.getCostumerListView.bind(this);
    this.saveCostumer = this.saveCostumer.bind(this);
    this.getCostumerDataView = this.getCostumerDataView.bind(this);
    this.vaciarCampos = this.vaciarCampos.bind(this);
  }

  static defaultProps = {
    costumerId: "",
    peopleId: "",
    costumerName: "",
    costumerPaterno: "",
    costumerMaterno: "",
    costumerDocumento: "",
    costumerExpDoc: "",
    costumerAddress: "",
    costumerPhone: "",
    costumerCellphone: "",
    costumerEmail: "",
    costumerList: [],
    actionForm: "Guardar",
  };

  componentDidMount() {
    this.getCostumerListView();
  }

  getCostumerListView() {
    getCostumerList().then((respCostumer) => {
      if (respCostumer.status === 200)
        this.setState({ costumerList: respCostumer.body });
      else console.log("Error");
      this.vaciarCampos();
    });
  }

  saveCostumer() {
    alertify.confirm(
      "Demo PROGRAMACION 3 dice",
      `Está seguro de ${this.state.actionForm}?`,
      () => {
        const dataToSave = {
          costumerId: this.state.costumerId,
          peopleId: this.state.peopleId,
          name: this.state.costumerName,
          aPaterno: this.state.costumerPaterno,
          aMaterno: this.state.costumerMaterno,
          document: this.state.costumerDocumento,
          expDocument: this.state.costumerExpDoc,
          address: this.state.costumerAddress,
          phone: this.state.costumerPhone,
          cellphone: this.state.costumerCellphone,
          email: this.state.costumerEmail,
        };

        if (this.state.actionForm === "Guardar") {
          save(dataToSave)
            .then((response) => {
              if (response.status === 200) this.getCostumerListView();
              else console.log("Error:");
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        } else if (this.state.actionForm === "Editar") {
          update(dataToSave)
            .then((response) => {
              if (response.status === 200) this.getCostumerListView();
              else console.log("Error:");
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        }
      },
      () => alertify.error("Cancelo Acción ")
    );
  }

  getCostumerDataView(idCostumer = "", action = "") {
    if (action === "update") {
      getCostumerData(idCostumer)
        .then((respData) => {
          if (respData.status === 200) {
            const productData = respData.body;
            this.setState({
              costumerId: productData.costumerId,
              peopleId: productData.peopleId,
              costumerName: productData.name,
              costumerPaterno: productData.apaterno,
              costumerMaterno: productData.amaterno,
              costumerDocumento: productData.document,
              costumerExpDoc: productData.expDocument,
              costumerAddress: productData.address,
              costumerPhone: productData.phone,
              costumerCellphone: productData.cellphone,
              costumerEmail: productData.email,
            });
            this.setState({ actionForm: "Editar" });
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } else if (action === "delete") {
      alertify.confirm(
        "Demo PROGRAMACION 3 dice",
        `Está seguro de Eliminar?`,
        () => {
          deleteCostumer(idCostumer)
            .then((resp) => {
              if (resp.status === 200) {
                this.vaciarCampos();
                this.getCostumerListView();
              } else {
                console.log("Error");
              }
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        },
        () => alertify.error("Cancelo Acción ")
      );
    }
  }

  vaciarCampos() {
    this.setState({
      actionForm: "Guardar",
      costumerId: "",
      costumerName: "",
      costumerPaterno: "",
      costumerMaterno: "",
      costumerDocumento: "",
      costumerExpDoc: "",
      costumerAddress: "",
      costumerPhone: "",
      costumerCellphone: "",
      costumerEmail: "",
    });
  }

  render() {
    const headTable = [
      "Nro.",
      "Nombres",
      "Apellido paterno",
      "Apellido materno",
      "Nro. Documento",
      "Exp. Documento",
      "Dirección",
      "Teléfono",
      "Celular",
      "e-mail",
    ];
    const headOrderTable = [
      "number",
      "name",
      "apaterno",
      "amaterno",
      "document",
      "expDocument",
      "address",
      "phone",
      "cellphone",
      "email",
    ];

    const cities = [
      { value: "LP", name: "LP", tag: "LP" },
      { value: "CBBA", name: "CBBA", tag: "CBBA" },
      { value: "SC", name: "SC", tag: "SC" },
      { value: "OR", name: "OR", tag: "OR" },
      { value: "PT", name: "PT", tag: "PT" },
      { value: "CH", name: "CH", tag: "CH" },
      { value: "TR", name: "TR", tag: "TR" },
      { value: "BN", name: "BN", tag: "BN" },
      { value: "PN", name: "PN", tag: "PN" },
    ];

    return (
      <div>
        <TitleSectionField texto={"Administrador de Clientes"} />
        <div className="row">
          <div className="col-md-3">
            <TextField
              idField={"name"}
              tagComponent={"Nombres"}
              placeholder={"Ingrese los nombres..."}
              value={this.state.costumerName}
              onChangeValue={(value) => this.setState({ costumerName: value })}
              isRequired
            />
            <TextField
              idField={"apaterno"}
              tagComponent={"Apellido Paterno"}
              placeholder={"Ingrese el apellido paterno"}
              value={this.state.costumerPaterno}
              onChangeValue={(value) =>
                this.setState({ costumerPaterno: value })
              }
            />
            <TextField
              idField={"amaterno"}
              tagComponent={"Apellido Materno"}
              placeholder={"Ingrese el apellido materno"}
              value={this.state.costumerMaterno}
              onChangeValue={(value) =>
                this.setState({ costumerMaterno: value })
              }
            />
            <div className="row">
              <div className="col-md-7">
                <TextField
                  idField={"ci"}
                  tagComponent={"Cédula de identidad / NIT"}
                  placeholder={"Ingrese la cédula o nro. De Nit"}
                  value={this.state.costumerDocumento}
                  onChangeValue={(value) =>
                    this.setState({ costumerDocumento: value })
                  }
                  isRequired
                />
              </div>
              <div className="col-md-5">
                <SelectListField
                  idField={"origendocumento"}
                  optionsList={cities}
                  tagComponent="Exp."
                  value={this.state.costumerExpDoc}
                  onClickOption={(value) =>
                    this.setState({ costumerExpDoc: value })
                  }
                />
              </div>
            </div>
            <TextField
              idField={"address"}
              tagComponent={"Dirección"}
              placeholder={"Ingrese la Dirección..."}
              value={this.state.costumerAddress}
              onChangeValue={(value) =>
                this.setState({ costumerAddress: value })
              }
              isRequired
            />
            <TextField
              idField={"telf"}
              tagComponent={"Teléfono"}
              placeholder={"Ingrese el nro. De teléfono"}
              value={this.state.costumerPhone}
              onChangeValue={(value) => this.setState({ costumerPhone: value })}
            />
            <TextField
              idField={"cel"}
              tagComponent={"Celular"}
              placeholder={"Ingrese el nro. De celular"}
              value={this.state.costumerCellphone}
              onChangeValue={(value) =>
                this.setState({ costumerCellphone: value })
              }
              isRequired
            />
            <TextField
              idField={"email"}
              tagComponent={"e-mail"}
              placeholder={"Ingrese el e-mail"}
              value={this.state.costumerEmail}
              onChangeValue={(value) => this.setState({ costumerEmail: value })}
            />
            <div className="row">
              <div className="col-md-6">
                <ButtonField
                  type={"primary"}
                  texto={this.state.actionForm}
                  onClick={this.saveCostumer}
                />
              </div>
              <div className="col-md-6">
                <ButtonField
                  type={"danger"}
                  texto={"Cancelar"}
                  onClick={this.vaciarCampos}
                />
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <TableField
              tagComponent={"Lista de Clientes"}
              head={headTable}
              headOrderTable={headOrderTable}
              data={this.state.costumerList}
              identificador={"costumerId"}
              forUpdate
              forDelete
              onClickItem={this.getCostumerDataView}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default View;
