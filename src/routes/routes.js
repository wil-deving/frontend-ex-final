//Seccion para hacer importaciones de las vistas
import Home from './Home/'
import Test from './Test/'

// Seccion que contruye el array para Router de REACT
const routes = [
    { path: '/', component: Home },
    { path: '/test', component: Test }
]
export default routes