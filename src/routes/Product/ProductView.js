import React, { Component } from "react";
import PropTypes from "prop-types";
import alertify from "alertifyjs";

import {
  getProductTypeList,
  getProductList,
  save,
  getProductData,
  update,
  deleteProduct,
} from "./ProductController.js";

import TitleSectionField from "./../../components/TitleSeccionField/TitleSectionField.js";
import SelectListField from "./../../components/SelectListField/SelectListField.js";
import TextField from "./../../components/TextField/TextField.js";
import NumberField from "./../../components/NumberField/NumberField.js";
import ButtonField from "./../../components/ButtonField/ButtonField.js";
import TableField from "./../../components/TableField/TableField.js";

import AppContext from "./../../routes/ContextApp";

class View extends Component {
  static contextType = AppContext;
  static propTypes = {
    idProduct: PropTypes.string,
    productTypeList: PropTypes.array,
    productTypeSelected: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    productCity: PropTypes.string,
    productAddress: PropTypes.string,
    productFolio: PropTypes.string,
    productCatastro: PropTypes.string,
    productPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    productSurface: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    productBuildedSurface: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    productList: PropTypes.array,
    actionForm: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      idProduct: this.props.idProduct,
      productTypeList: this.props.productTypeList,
      productTypeSelected: this.props.productTypeSelected,
      productCity: this.props.productCity,
      productAddress: this.props.productAddress,
      productFolio: this.props.productFolio,
      productCatastro: this.props.productCatastro,
      productPrice: this.props.productPrice,
      productSurface: this.props.productSurface,
      productBuildedSurface: this.props.productBuildedSurface,
      productList: this.props.productList,
      actionForm: this.props.actionForm,
    };
    this.getProductListView = this.getProductListView.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.getProductDataView = this.getProductDataView.bind(this);
    this.vaciarCampos = this.vaciarCampos.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.validateEachField = this.validateEachField.bind(this);
  }

  static defaultProps = {
    idProduct: "",
    productTypeList: [],
    productTypeSelected: 0,
    productCity: "",
    productAddress: "",
    productFolio: "",
    productCatastro: "",
    productPrice: 0,
    productSurface: 0,
    productBuildedSurface: 0,
    productList: [],
    actionForm: "Guardar",
  };

  componentDidMount() {
    const storage = localStorage.getItem("userData");
    const dataStorage = JSON.parse(storage);
    if (!dataStorage) return this.props.history.push("/");
    if (!dataStorage.userId) return this.props.history.push("/");

    getProductTypeList().then((respProductType) => {
      if (respProductType.status === 200) {
        this.setState({ productTypeList: respProductType.viewResponse });
        this.getProductListView();
      } else console.log("Error");
    });
  }

  getProductListView() {
    getProductList().then((respProduct) => {
      if (respProduct.status === 200)
        this.setState({ productList: respProduct.body });
      else console.log("Error");
      this.vaciarCampos();
    });
  }

  validateFields() {
    const {
      productTypeSelected,
      productCity,
      productAddress,
      productFolio,
      productCatastro,
      productPrice,
      productSurface,
      productBuildedSurface,
    } = this.state;

    if (!this.validateEachField(productTypeSelected, "string")) {
      alertify.warning("Seleccione un Tipo de Bien");
      return false;
    }
    if (!this.validateEachField(productCity, "string")) {
      alertify.warning("Seleccione la Ciudad del Bien");
      return false;
    }
    if (!this.validateEachField(productAddress, "string")) {
      alertify.warning("Debe llenar la Dirección");
      return false;
    }
    if (!this.validateEachField(productFolio, "string")) {
      alertify.warning("Debe llenar el Código de Folio");
      return false;
    }
    if (!this.validateEachField(productCatastro, "string")) {
      alertify.warning("Debe llenar el Código Catastral");
      return false;
    }
    if (!this.validateEachField(productPrice, "number")) {
      alertify.warning(
        "Debe llenar el Precio de la propiedad con un valor mayor a 0"
      );
      return false;
    }
    if (!this.validateEachField(productSurface, "number")) {
      alertify.warning("Debe llenar la Superficie de la Propiedad");
      return false;
    }
    if (!this.validateEachField(productBuildedSurface, "string")) {
      alertify.warning("El campo Superficie Construida no debe estar vacío");
      return false;
    }
    return true;
  }

  validateEachField(field, type) {
    if (type === "number") {
      if (field === "" || field === null || field === undefined || field <= 0)
        return false;
    } else if (type === "string") {
      if (field === "" || field === null || field === undefined) return false;
    }
    return true;
  }

  saveProduct() {
    const usuario = this.context;
    usuario.isAuth = true;
    if (this.validateFields()) {
      alertify.confirm(
        "Demo PROGRAMACION 3 dice",
        `Está seguro de ${this.state.actionForm}?`,
        () => {
          const dataToSave = {
            idProduct: this.state.idProduct,
            idProductType: Number(this.state.productTypeSelected),
            city: this.state.productCity,
            address: this.state.productAddress,
            codeFolio: this.state.productFolio,
            codeCatastro: this.state.productCatastro,
            price: Number(this.state.productPrice),
            surface: Number(this.state.productSurface),
            buildedSurface: Number(this.state.productBuildedSurface),
          };

          if (this.state.actionForm === "Guardar") {
            save(dataToSave)
              .then((response) => {
                if (response.status === 200) this.getProductListView();
                else console.log("Error:");
              })
              .catch((error) => {
                console.log("Error:", error);
              });
          } else if (this.state.actionForm === "Editar") {
            update(dataToSave)
              .then((response) => {
                if (response.status === 200) this.getProductListView();
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
  }

  getProductDataView(idProduct = "", action = "") {
    if (action === "update") {
      getProductData(idProduct)
        .then((respData) => {
          if (respData.status === 200) {
            const productData = respData.body;
            this.setState({
              idProduct: productData.idProduct,
              productTypeSelected: productData.idProductType,
              productCity: productData.city,
              productAddress: productData.address,
              productFolio: productData.codeFolio,
              productCatastro: productData.codeCatastro,
              productPrice: productData.price,
              productSurface: productData.surface,
              productBuildedSurface: productData.buildedSurface,
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
          deleteProduct(idProduct)
            .then((resp) => {
              if (resp.status === 200) {
                this.vaciarCampos();
                this.getProductListView();
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
      idProduct: "",
      productTypeSelected: "",
      productCity: "",
      productAddress: "",
      productFolio: "",
      productCatastro: "",
      productPrice: 0,
      productSurface: 0,
      productBuildedSurface: 0,
    });
  }

  render() {
    const cities = [
      { value: "La Paz", name: "La Paz", tag: "La Paz" },
      { value: "Cochabamba", name: "Cochabamba", tag: "Cochabamba" },
      { value: "Santa Cruz", name: "Santa Cruz", tag: "Santa Cruz" },
    ];
    const headTable = [
      "Nro.",
      "Ciudad",
      "Dirección",
      "Tipo",
      "Código Folio",
      "Precio Catastral",
      "Superficie",
      "Superficie construida",
    ];
    const headOrderTable = [
      "number",
      "city",
      "address",
      "description",
      "codeFolio",
      "price",
      "surface",
      "buildedSurface",
    ];
    const { productTypeList } = this.state;

    return (
      <div>
        <TitleSectionField texto={"Administrador de Bienes Inmuebles"} />
        <div className="row">
          <div className="col-md-4">
            <SelectListField
              idField={"productTypes"}
              optionsList={productTypeList}
              tagComponent="Seleccione el tipo de Bien"
              value={this.state.productTypeSelected}
              onClickOption={(value) =>
                this.setState({ productTypeSelected: value })
              }
            />
            <SelectListField
              idField={"city"}
              optionsList={cities}
              tagComponent="Ciudad"
              value={this.state.productCity}
              onClickOption={(value) => this.setState({ productCity: value })}
            />
            <TextField
              idField={"address"}
              tagComponent={"Dirección"}
              placeholder={"Ingrese la Dirección"}
              value={this.state.productAddress}
              onChangeValue={(value) =>
                this.setState({ productAddress: value })
              }
              isRequired
            />
            <TextField
              idField={"folio"}
              tagComponent={"Código Folio"}
              placeholder={"Ingrese el código de folio"}
              value={this.state.productFolio}
              onChangeValue={(value) => this.setState({ productFolio: value })}
              isRequired
            />
            <TextField
              idField={"catastro"}
              tagComponent={"Código catastral"}
              placeholder={"Ingrese el código catastral"}
              value={this.state.productCatastro}
              onChangeValue={(value) =>
                this.setState({ productCatastro: value })
              }
              isRequired
            />
            <NumberField
              idField={"precio"}
              defaultValue={0}
              tagComponent={"Precio Catastral"}
              tagValue={"USD"}
              value={this.state.productPrice}
              onChangeValue={(value) => this.setState({ productPrice: value })}
            />
            <NumberField
              idField={"superficie"}
              defaultValue={0}
              tagComponent={"Superficie del Terreno"}
              tagValue={"metros cuadrados"}
              value={this.state.productSurface}
              onChangeValue={(value) =>
                this.setState({ productSurface: value })
              }
            />
            <NumberField
              idField={"superficieConstruida"}
              defaultValue={0}
              tagComponent={"Superficie Construída"}
              tagValue={"metros cuadrados"}
              value={this.state.productBuildedSurface}
              onChangeValue={(value) =>
                this.setState({ productBuildedSurface: value })
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
              tagComponent={"Lista de Bienes"}
              head={headTable}
              headOrderTable={headOrderTable}
              data={this.state.productList}
              identificador={"idProduct"}
              forUpdate
              forDelete
              onClickItem={this.getProductDataView}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default View;
