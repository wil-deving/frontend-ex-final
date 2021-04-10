/**
 * Created by Williams on 9/3/2020.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, HashRouter } from "react-router-dom";

//Seccion que importa los estilos del componente
import "./MenuBar.scss";

class MiComponente extends Component {
  static propTypes = {
    showItemsNav: PropTypes.bool,
    showItemsReports: PropTypes.bool,
    showItemsSales: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      showItemsNav: this.props.showItemsNav,
      showItemsReports: this.props.showItemsReports,
      showItemsSales: this.props.showItemsSales,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleReports = this.toggleReports.bind(this);
    this.toogleSale = this.toogleSale.bind(this);
  }

  static defaultProps = {
    showItemsNav: false,
    showItemsReports: false,
    showItemsSales: false,
  };

  componentWillMount() {
    //console.log('componentWillMountComponent')
  }

  componentDidMount() {
    //console.log('componentDidMountComponent')
  }

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

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('shouldComponentUpdateComponent', nextProps, nextState)
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('componentWillUpdateComponent', nextProps, nextState)
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('componentDidUpdateComponent', prevProps, prevState)
  }

  componentWillUnmount() {
    //console.log('componentWillUnmountComponent')
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
    var { showItemsNav, showItemsReports, showItemsSales } = this.state;
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
              {/*<li>
                <span><Link className="gen-item" to="/test">Test</Link></span>
              </li>*/}
              <li>
                <span className="gen-item">Reportes</span>
                <ul>
                  <li>
                    <span>
                      <Link className="gen-item" to="/quotes">
                        Cotizaciones
                      </Link>
                    </span>
                  </li>
                  {/*<li><span><Link className="gen-item" to="/test">Ventas</Link></span></li>*/}
                </ul>
              </li>
              <li>
                <span>
                  <Link className="gen-item" to="/products">
                    Productos
                  </Link>
                </span>
              </li>
              <li>
                <span>
                  <Link className="gen-item" to="/clients">
                    Clientes
                  </Link>
                </span>
              </li>
              <li>
                <span>
                  <Link className="gen-item" to="/offers">
                    Ofertas
                  </Link>
                </span>
              </li>
            </ul>
          </nav>
        </HashRouter>
      </div>
    );
  }
}
export default MiComponente;
