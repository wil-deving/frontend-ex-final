import React, { Component } from "react";
import PropTypes from "prop-types";
//Seccion que carga el archivo que realiza los estilos
import "./Home.scss";

//Seccion para instanciar gestores e importar funciones del controller
import { GUARDAR } from "./HomeController.js";

//Seccion para importar componentes

//Seccion para importar la funcion que retorna la entidad del view
import { obtenerEntidadForView } from "./../../data/EntitiesView.js";
//constante que treara el objeto entidad para esta vista, para mandar a los props de los componentes

import TitleSectionField from "./../../components/TitleSeccionField/TitleSectionField.js";

const EntityView = obtenerEntidadForView("Home");

class View extends Component {
  static propTypes = {};

  constructor(props) {
    // console.log('constructorView')
    super(props);

    // bindeo para funciones y metodos
  }

  static defaultProps = {};

  componentWillMount() {
    //console.log('componentWillMountView')
  }

  componentDidMount() {
    //console.log('componentDidMountView')
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('shouldComponentUpdateView', nextProps, nextState)
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('componentWillUpdateView', nextProps, nextState)
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdateView', prevProps, prevState)
  }

  render() {
    console.log("renderView", this, window.screen.width);
    console.log("renderView", this, window.screen.height);
    let ancho = window.screen.width + 200;
    let alto = window.screen.height;

    return (
      <div className="contenedor">
        <TitleSectionField texto={"¡Bienvenido!"} />

        <div id="mainimage">
          <img src="appImages/casa01.jpg" alt="" width="700" height="500"></img>
        </div>

        <div id="maintext">
          <h5>Misión</h5>
          <p>
            Ser una organización empresarial dedicada a asistir a nuestros
            clientes en los momentos críticos presentándoles servicios dignos a
            través de un grupo humano con profesionalismo y sensibilidad a sus
            necesidades.
          </p>
        </div>

        <div id="maintexttwo">
          <h5>Visión</h5>
          <p>
            Ser un modelo empresarial de cambio con responsabilidad social en
            Bolivia, con presencia internacional y ejemplo de servicio al
            cliente.
          </p>
        </div>

        <section id="redessociales">
          <a href="#">
            <img
              src="appImages/facebook.jpg"
              alt=""
              width="100"
              height="100"
            ></img>
          </a>
          <a href="#">
            <img
              src="appImages/instagram.jpg"
              alt=""
              width="100"
              height="100"
            ></img>
          </a>
          <a href="#">
            <img
              src="appImages/twitter.png"
              alt=""
              width="100"
              height="100"
            ></img>
          </a>
        </section>

        <div id="footerpagina">
          <div className="contenedor">
            <div className="mod-pie-pag pie-pag-izq">
              <span className="pie-nombre-marca">
                Demo Sistema de Inmobiliaria
              </span>
              <br></br>
              <span className="pie-derechos-aut">
                ©2021 Todos los derechos están protegidos sobre el autor.
              </span>
            </div>
            <div className="mod-pie-pag pie-pag-der">
              <address>
                Bolivia, La Paz
                <br></br>
                Calle Federico Suazo
                <br></br>
                Tel. 76527336
              </address>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default View;
