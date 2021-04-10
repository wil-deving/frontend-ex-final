import React, { Component } from "react";
import PropTypes from "prop-types";
import alertify from "alertifyjs";

import {
  getProductList,
  getCostumerList,
  getAllProductList,
  save,
  getOfferData,
  update,
} from "./OfferController";

import TitleSectionField from "./../../components/TitleSeccionField/TitleSectionField.js";
import SelectListField from "./../../components/SelectListField/SelectListField.js";
import NumberField from "./../../components/NumberField/NumberField.js";
import ButtonField from "./../../components/ButtonField/ButtonField.js";
import TableField from "./../../components/TableField/TableField.js";

class View extends Component {
  static propTypes = {
    offerId: PropTypes.string,
    productList: PropTypes.array,
    showProductList: PropTypes.bool,
    costumerList: PropTypes.array,
    productSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    costumerSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    productOfferPrice: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    productAvailability: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    productOfferedList: PropTypes.array,
    actionForm: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      offerId: this.props.offerId,
      productList: this.props.productList,
      showProductList: this.props.showProductList,
      costumerList: this.props.costumerList,
      productSelected: this.props.productSelected,
      costumerSelected: this.props.costumerSelected,
      productOfferPrice: this.props.productOfferPrice,
      productAvailability: this.props.productAvailability,
      productOfferedList: this.props.productOfferedList,
      actionForm: this.props.actionForm,
    };
    this.getAllProductListView = this.getAllProductListView.bind(this);
    this.getProductListAndCostumersForOffer = this.getProductListAndCostumersForOffer.bind(
      this
    );
    this.saveProduct = this.saveProduct.bind(this);
    this.getProductDataView = this.getProductDataView.bind(this);
    this.vaciarCampos = this.vaciarCampos.bind(this);
  }

  static defaultProps = {
    offerId: "",
    productList: [],
    showProductList: true,
    costumerList: [],
    productSelected: "",
    costumerSelected: "",
    productOfferPrice: 0,
    productAvailability: 1,
    productOfferedList: [],
    actionForm: "Guardar",
  };

  componentDidMount() {
    this.getProductListAndCostumersForOffer();
  }

  getProductListAndCostumersForOffer() {
    getProductList().then((respProductList) => {
      if (respProductList.status === 200) {
        this.setState({ productList: respProductList.viewResponse });
        getCostumerList().then((respCostumerList) => {
          if (respCostumerList.status === 200) {
            this.setState({ costumerList: respCostumerList.viewResponse });
            this.getAllProductListView();
          }
        });
      } else console.log("Error");
    });
  }

  getAllProductListView() {
    getAllProductList().then((respProduct) => {
      if (respProduct.status === 200) {
        const reformatDataTable = respProduct.body.map((item) => {
          item.showAvailable =
            item.available === 1 ? (
              <p
                style={{
                  backgroundColor: "#08ffc8",
                  padding: "6px",
                  borderRadius: "5px",
                  color: "black",
                }}
              >
                Disponible
              </p>
            ) : (
              <p
                style={{
                  backgroundColor: "#ef4b4b",
                  padding: "6px",
                  borderRadius: "5px",
                  color: "white",
                }}
              >
                No Disponible
              </p>
            );
          return item;
        });
        this.setState({ productOfferedList: respProduct.body });
      } else console.log("Error");
      this.vaciarCampos();
    });
  }

  saveProduct() {
    alertify.confirm(
      "Demo PROGRAMACION 3 dice",
      `Está seguro de ${this.state.actionForm}?`,
      () => {
        const dataToSave = {
          offerId: this.state.offerId,
          costumerId: this.state.costumerSelected,
          productId: this.state.productSelected,
          offerPrice: Number(this.state.productOfferPrice),
          available: Number(this.state.productAvailability),
        };

        if (this.state.actionForm === "Guardar") {
          save(dataToSave)
            .then((response) => {
              if (response.status === 200) {
                this.getAllProductListView();
                this.getProductListAndCostumersForOffer();
              } else console.log("Error:");
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        } else if (this.state.actionForm === "Editar") {
          update(dataToSave)
            .then((response) => {
              if (response.status === 200) {
                this.getAllProductListView();
                this.getProductListAndCostumersForOffer();
              } else console.log("Error:");
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        }
      },
      () => alertify.error("Cancelo Acción ")
    );
  }

  getProductDataView(offerIdToUpdate = "", action = "") {
    let updateIsPossible = false;
    let offerElement = {};
    const elemenstList = this.state.productOfferedList;
    for (let ind in elemenstList) {
      if (elemenstList[ind].offerId === offerIdToUpdate) {
        offerElement = elemenstList[ind];
        break;
      }
    }
    if (action === "update") {
      getOfferData(offerIdToUpdate)
        .then((respData) => {
          if (respData.status === 200) {
            const offerData = respData.body;
            if (Number(offerElement.available) === 0) {
              const productsToOffer = this.state.productList;
              for (let i in productsToOffer) {
                if (offerData.productId === productsToOffer[i].value) {
                  updateIsPossible = true;
                  break;
                }
              }
            } else {
              updateIsPossible = true;
            }
            if (updateIsPossible) {
              this.setState({
                showProductList: false,
                offerId: offerData.offerId,
                productSelected: offerData.productId,
                costumerSelected: offerData.costumerId,
                productOfferPrice: offerData.offerPrice,
                productAvailability: offerData.available,
                actionForm: "Editar",
              });
            } else {
              alertify.message(
                "No se puede editar, el Bien Inmueble ya se encuentra en oferta."
              );
            }
          } else {
            console.log("Error");
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }

  vaciarCampos() {
    this.setState({
      showProductList: true,
      actionForm: "Guardar",
      offerId: "",
      productSelected: "",
      costumerSelected: "",
      productOfferPrice: 0,
      productAvailability: 1,
    });
  }

  render() {
    const availabilityOptions = [
      { value: 0, name: "No Disponible", tag: "No Disponible" },
      { value: 1, name: "Disponible", tag: "Disponible" },
    ];
    const headTable = [
      "Nro.",
      "Ciudad",
      "Dirección",
      "Tipo",
      "Folio",
      "Superficie",
      "Superficie construida",
      "Propietario",
      "Precio de oferta",
      "Disponibilidad",
    ];
    const headOrderTable = [
      "number",
      "city",
      "address",
      "description",
      "codeFolio",
      "surface",
      "buildedSurface",
      "clientName",
      "offerPrice",
      "showAvailable",
    ];
    const {
      productList,
      costumerList,
      productOfferedList,
      showProductList,
    } = this.state;
    return (
      <div>
        <TitleSectionField texto={"Administrador de Bienes en oferta"} />
        <div className="row">
          <div className="col-md-4">
            <SelectListField
              visible={showProductList}
              idField={"client"}
              optionsList={productList}
              tagComponent="Seleccione el Bien Inmueble por código de Folio"
              value={this.state.productSelected}
              onClickOption={(value) =>
                this.setState({ productSelected: value })
              }
            />
            <SelectListField
              idField={"folio"}
              optionsList={costumerList}
              tagComponent="Seleccione el Cliente"
              value={this.state.costumerSelected}
              onClickOption={(value) =>
                this.setState({ costumerSelected: value })
              }
            />
            <NumberField
              idField={"price"}
              defaultValue={0}
              tagComponent={"Precio de Oferta"}
              tagValue={"USD"}
              value={this.state.productOfferPrice}
              onChangeValue={(value) =>
                this.setState({ productOfferPrice: value })
              }
            />
            <SelectListField
              idField={"availability"}
              optionsList={availabilityOptions}
              tagComponent="Disponibilidad"
              value={this.state.productAvailability}
              onClickOption={(value) =>
                this.setState({ productAvailability: value })
              }
            />
            <div className="row">
              <div className="col-md-6">
                <ButtonField
                  type={"primary"}
                  texto={this.state.actionForm}
                  onClick={this.saveProduct}
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
          <div className="col-md-8">
            <TableField
              tagComponent={"Lista de Bienes en Oferta"}
              head={headTable}
              headOrderTable={headOrderTable}
              data={productOfferedList}
              identificador={"offerId"}
              forUpdate
              onClickItem={this.getProductDataView}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default View;
