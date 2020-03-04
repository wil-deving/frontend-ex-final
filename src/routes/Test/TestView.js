import React, { Component } from 'react'
import PropTypes from 'prop-types'
//Seccion que carga el archivo que realiza los estilos
import './Test.scss'

//Seccion para instanciar gestores e importar funciones del controller
import {
    GUARDAR
} from './TestController.js'

//Seccion para importar componentes

//Seccion para importar la funcion que retorna la entidad del view
//import { obtenerEntidadForView } from './../../data/EntitiesView.js'
//constante que treara el objeto entidad para esta vista, para mandar a los props de los componentes
//const EntityView = obtenerEntidadForView('MyEntityView')

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
        //console.log('renderView', this)
        return (
            <div>
                View TEST
            </div>
        )
    }

}
export default View