//Seccion para hacer importaciones de las vistas
import Home from "./Home/";
import Test from "./Test/";
import Vehicles from "./Vehicles/";
import SubTrademark from "./SubTrademark/";
import Quotes from "./Quotes/";
import Entity from "./Entity/";

import Product from "./Product/";
import Client from "./Client/";
import Offer from "./Offer/";

// Seccion que contruye el array para Router de REACT
const routes = [
  { path: "/", component: Home },
  //{ path: '/test', component: Test },
  //{ path: '/vehiculos', component: Vehicles },
  //{ path: '/marcas', component: SubTrademark },
  // { path: '/quotes', component: Quotes },
  { path: "/products", component: Product },
  { path: "/clients", component: Client },
  { path: "/offers", component: Offer },
];
export default routes;
