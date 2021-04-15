//Seccion para hacer importaciones de las vistas
import Home from "./Home/";
import Product from "./Product/";
import Client from "./Client/";
import Offer from "./Offer/";
import Sale from "./Sale/";
import SalesReport from "./SalesReport/";
import InquiriesReport from "./InquiriesReport/";

// Seccion que contruye el array para Router de REACT
const routes = [
  { path: "/", component: Home },
  { path: "/products", component: Product },
  { path: "/clients", component: Client },
  { path: "/offers", component: Offer },
  { path: "/sales", component: Sale },
  { path: "/sales-report", component: SalesReport },
  { path: "/inquiries-report", component: InquiriesReport },
];
export default routes;
