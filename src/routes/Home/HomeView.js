import React, { Component } from 'react'
import PropTypes from 'prop-types'
//Seccion que carga el archivo que realiza los estilos
import './Home.scss'

//Seccion para instanciar gestores e importar funciones del controller
import {
    GUARDAR
} from './HomeController.js'

//Seccion para importar componentes

//Seccion para importar la funcion que retorna la entidad del view
import { obtenerEntidadForView } from './../../data/EntitiesView.js'
//constante que treara el objeto entidad para esta vista, para mandar a los props de los componentes
const EntityView = obtenerEntidadForView('Home')

class View extends Component {

    static propTypes = {

    }

    constructor (props) {
        // console.log('constructorView')
        super(props)

        // bindeo para funciones y metodos
    }

    static defaultProps = {

    }

    componentWillMount(){
        //console.log('componentWillMountView')
    }

    componentDidMount(){
        //console.log('componentDidMountView')
    }

    shouldComponentUpdate(nextProps, nextState){
        //console.log('shouldComponentUpdateView', nextProps, nextState)
        return true
    }

    componentWillUpdate(nextProps, nextState){
        //console.log('componentWillUpdateView', nextProps, nextState)
    }

    componentDidUpdate(prevProps, prevState){
        //console.log('componentDidUpdateView', prevProps, prevState)
    }

    componentWillUnmount(){
        //console.log('componentWillUnmountView')
    }

    render () {
        console.log('renderView', this, window.screen.width)
        console.log('renderView', this, window.screen.height)
        let ancho = window.screen.width + 200
        let alto = window.screen.height

        return (
            <div className="cont-inicio" >
                <img
                    src="FondoInicioUno.jpg"
                    alt="Fondo Auto Tienda"
                    width={ancho}
                    height={alto} />
            </div>
        )
    }

}
export default View