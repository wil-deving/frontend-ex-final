import React, { Component } from "react";
import PropTypes from "prop-types";
import alertify from "alertifyjs";

import {
  getProductsAvailableToOffer,
  getAgentList,
  getAllSalesList,
  save,
} from "./SaleController";

import TitleSectionField from "./../../components/TitleSeccionField/TitleSectionField.js";
import SelectListField from "./../../components/SelectListField/SelectListField.js";
import NumberField from "./../../components/NumberField/NumberField.js";
import TextField from "./../../components/TextField/TextField";
import ButtonField from "./../../components/ButtonField/ButtonField.js";
import TableField from "./../../components/TableField/TableField.js";

class View extends Component {
  static propTypes = {
    saleId: PropTypes.string,
    offerId: PropTypes.string,
    productSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    productOfferedList: PropTypes.array,
    productOfferedListData: PropTypes.array,
    showProductList: PropTypes.bool,
    costumerName: PropTypes.string,
    productPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    offerProductPrice: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    agentSelected: PropTypes.string,
    agentList: PropTypes.array,
    productSalePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    salesList: PropTypes.array,
    actionForm: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      saleId: this.props.saleId,
      offerId: this.props.offerId,
      productSelected: this.props.productSelected,
      productOfferedList: this.props.productOfferedList,
      productOfferedListData: this.props.productOfferedListData,
      showProductList: this.props.showProductList,
      costumerName: this.props.costumerName,
      productPrice: this.props.productPrice,
      offerProductPrice: this.props.offerProductPrice,
      agentSelected: this.props.agentSelected,
      agentList: this.props.agentList,
      productSalePrice: this.props.productSalePrice,
      salesList: this.props.salesList,
      actionForm: this.props.actionForm,
    };
    this.getAllSalesListView = this.getAllSalesListView.bind(this);
    this.getProductsToOfferList = this.getProductsToOfferList.bind(this);
    this.getAgentListView = this.getAgentListView.bind(this);
    this.handleProductList = this.handleProductList.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.vaciarCampos = this.vaciarCampos.bind(this);
  }

  static defaultProps = {
    saleId: "",
    offerId: "",
    productSelected: "",
    productOfferedList: [],
    productOfferedListData: [],
    showProductList: true,
    costumerName: "",
    productPrice: 0,
    offerProductPrice: 0,
    agentSelected: "",
    agentList: [],
    productSalePrice: 0,
    salesList: [],
    actionForm: "Guardar",
  };

  componentDidMount() {
    this.getAllSalesListView();
    this.getProductsToOfferList();
    this.getAgentListView();
  }

  getAllSalesListView() {
    getAllSalesList().then((resp) => {
      if (resp.status === 200) {
        this.setState({ salesList: resp.body });
      } else console.log("Error");
    });
  }

  getProductsToOfferList() {
    getProductsAvailableToOffer().then((resp) => {
      if (resp.status === 200) {
        this.setState({ productOfferedListData: resp.body });
        const forProductOfferedList = resp.body.map((item) => ({
          value: item.productId,
          name: item.codeFolio,
          tag: item.codeFolio,
        }));
        this.setState({ productOfferedList: forProductOfferedList });
      } else console.log("Error");
    });
  }

  getAgentListView() {
    getAgentList().then((resp) => {
      if (resp.status === 200) {
        this.setState({ agentList: resp.viewResponse });
      } else console.log("Error");
    });
  }

  handleProductList(productId = "") {
    let offerSelected = {};
    if (productId !== "" && productId !== null && productId !== undefined) {
      const productListToOffer = this.state.productOfferedListData;
      for (let i in productListToOffer) {
        if (productListToOffer[i].productId === productId) {
          offerSelected = productListToOffer[i];
          break;
        }
      }
      this.setState({
        offerId: offerSelected.offerId,
        costumerName: offerSelected.costumerName,
        productPrice: offerSelected.price,
        offerProductPrice: offerSelected.offerPrice,
      });
    }
  }

  saveProduct() {
    alertify.confirm(
      "Demo PROGRAMACION 3 dice",
      `Está seguro de ${this.state.actionForm}?`,
      () => {
        const dataToSave = {
          saleId: this.state.saleId,
          offerId: this.state.offerId,
          userId: this.state.agentSelected,
          salePrice: Number(this.state.productSalePrice),
        };
        if (this.state.actionForm === "Guardar") {
          save(dataToSave)
            .then((response) => {
              if (response.status === 200) {
                this.getAllSalesListView();
                this.getProductsToOfferList();
                this.getAgentListView();
                this.vaciarCampos();
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

  vaciarCampos() {
    this.setState({
      showProductList: true,
      actionForm: "Guardar",
      offerId: "",
      productSelected: "",
      costumerName: "",
      productPrice: 0,
      offerProductPrice: 0,
      agentSelected: "",
      productSalePrice: 0,
    });
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
    const {
      productOfferedList,
      costumerName,
      productPrice,
      offerProductPrice,
      agentList,
      salesList,
      showProductList,
    } = this.state;
    return (
      <div>
        <TitleSectionField texto={"Administrador de Bienes en oferta"} />
        <div className="row">
          <div className="col-md-4">
            <SelectListField
              visible={showProductList}
              idField={"product"}
              optionsList={productOfferedList}
              tagComponent="Seleccione el Bien Inmueble por código de Folio"
              value={this.state.productSelected}
              onClickOption={this.handleProductList}
            />
            <TextField
              idField={"costumer"}
              enabled={false}
              tagComponent={"Cliente"}
              placeholder={""}
              value={costumerName}
            />
            <TextField
              idField={"price"}
              enabled={false}
              tagComponent={"Precio Catastral"}
              placeholder={""}
              value={productPrice}
            />
            <TextField
              idField={"offerPrice"}
              enabled={false}
              tagComponent={"Precio de Oferta"}
              placeholder={""}
              value={offerProductPrice}
            />
            <SelectListField
              idField={"agent"}
              optionsList={agentList}
              tagComponent="Seleccione el Agente de esta venta"
              value={this.state.agentSelected}
              onClickOption={(value) => this.setState({ agentSelected: value })}
            />
            <NumberField
              idField={"saleprice"}
              defaultValue={0}
              tagComponent={"Precio de Venta"}
              tagValue={"USD"}
              value={this.state.productSalePrice}
              onChangeValue={(value) =>
                this.setState({ productSalePrice: value })
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
              data={salesList}
              identificador={"saleId"}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default View;
