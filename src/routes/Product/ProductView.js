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

class View extends Component {
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

  saveProduct() {
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
      "Precio pastastral",
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
              tagComponent="Seleccione el tipo de Producto"
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
