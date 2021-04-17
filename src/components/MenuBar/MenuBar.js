/**
 * Created by Williams on 9/3/2020.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, HashRouter } from "react-router-dom";
import AppContext from "./../../routes/ContextApp";

//Seccion que importa los estilos del componente
import "./MenuBar.scss";

class MiComponente extends Component {
  static contextType = AppContext;

  static propTypes = {
    showItemsNav: PropTypes.bool,
    showItemsReports: PropTypes.bool,
    showItemsSales: PropTypes.bool,
    userRole: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      showItemsNav: this.props.showItemsNav,
      showItemsReports: this.props.showItemsReports,
      showItemsSales: this.props.showItemsSales,
      userRole: this.props.userRole,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleReports = this.toggleReports.bind(this);
    this.toogleSale = this.toogleSale.bind(this);
  }

  static defaultProps = {
    showItemsNav: false,
    showItemsReports: false,
    showItemsSales: false,
    userRole: 0,
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
  }

  componentDidMount() {
    const storage = localStorage.getItem("userData");
    const dataStorage = JSON.parse(storage);
    if (dataStorage) {
      if (dataStorage.userId) {
        if (dataStorage.rolId > 0)
          this.setState({ userRole: Number(dataStorage.rolId) });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('shouldComponentUpdateComponent', nextProps, nextState)
    return true;
  }

  toggleNav() {
    this.setState({
      showItemsNav: !this.state.showItemsNav,
    });
  }

  toggleReports() {
    this.setState({
      showItemsReports: !this.state.showItemsReports,
    });
  }

  toogleSale() {
    this.setState({
      showItemsSales: !this.state.showItemsSales,
    });
  }

  render() {
    // console.log('renderComponent')
    var { userRole } = this.state;
    console.log("YYY", userRole);
    return (
      <div id="container-navigation" className="dropdown-cont">
        <HashRouter>
          <nav>
            <span id="nav-titlte">DEMO PROGRAMACION 3</span>
            <ul>
              <li>
                <span>
                  <Link className="gen-item" to="/">
                    Home
                  </Link>
                </span>
              </li>
              {userRole === 0 ? (
                <li>
                  <span>
                    <Link className="gen-item" to="/login">
                      Iniciar Sesión
                    </Link>
                  </span>
                </li>
              ) : null}
              {userRole !== 0 ? (
                <li>
                  <span className="gen-item">Reportes</span>
                  <ul>
                    {userRole === 2 ? null : (
                      <li>
                        <span>
                          <Link className="gen-item" to="/sales-report">
                            Ventas
                          </Link>
                        </span>
                      </li>
                    )}
                    <li>
                      <span>
                        <Link className="gen-item" to="/inquiries-report">
                          Consultas
                        </Link>
                      </span>
                    </li>
                  </ul>
                </li>
              ) : null}
              {userRole === 1 ? (
                <li>
                  <span>
                    <Link className="gen-item" to="/products">
                      Bienes
                    </Link>
                  </span>
                </li>
              ) : null}
              {userRole === 1 ? (
                <li>
                  <span>
                    <Link className="gen-item" to="/clients">
                      Clientes
                    </Link>
                  </span>
                </li>
              ) : null}
              {userRole > 0 ? (
                <li>
                  <span>
                    <Link className="gen-item" to="/offers">
                      Ofertas
                    </Link>
                  </span>
                </li>
              ) : null}
              {userRole === 1 ? (
                <li>
                  <span>
                    <Link className="gen-item" to="/sales">
                      Ventas
                    </Link>
                  </span>
                </li>
              ) : null}
              {userRole > 0 ? (
                <li>
                  <button
                    onClick={() => {
                      localStorage.setItem("userData", null);
                      window.location.reload();
                    }}
                  >
                    Cerrar Sesion
                  </button>
                </li>
              ) : null}
            </ul>
          </nav>
        </HashRouter>
      </div>
    );
  }
}
export default MiComponente;
