/**
 * Created by Williams on 8/3/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
//Seccion que carga el archivo que realiza los estilos
import './SubTrademark.scss'

//Seccion para instanciar gestores e importar funciones del controller
import {
    GUARDAR
} from './SubTrademarkController.js'

//Seccion para importar componentes
import TitleSectionField from './../../components/TitleSeccionField/TitleSectionField.js'
import SelectListField from './../../components/SelectListField/SelectListField.js'
import TextField from './../../components/TextField/TextField.js'
import NumberField from './../../components/NumberField/NumberField.js'
import ButtonField from './../../components/ButtonField/ButtonField.js'
import TableField from './../../components/TableField/TableField.js'

//Seccion para importar la funcion que retorna la entidad del view
import { obtenerEntidadForView } from './../../data/EntitiesView.js'
//constante que treara el objeto entidad para esta vista, para mandar a los props de los componentes
const EntityView = obtenerEntidadForView('MyEntityView')

class View extends Component {

    static propTypes = {

    }

    constructor (props) {
        // console.log('constructorView')
        super(props)

        // bindeo para funciones y metodos
        this.GuardarMarca = this.GuardarMarca.bind(this)
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

    GuardarMarca () {
        console.log('GuardarMarca', this.refs)
    }

    render () {
        //console.log('renderView', this)
        return (
            <div>
                <TitleSectionField texto={'Seccion Marcas'}/>

                <div className="row">
                    <div className="col-md-4">
                        <SelectListField />
                        <TextField ref={'name'}
                            idField={'name'}
                            tagComponent={'Nombre'}
                            placeholder={'Nombre...'}
                            isRequired />

                        <NumberField ref={'capacidad'}
                            idField={'capacidad'}
                            defaultValue={5}
                            tagComponent={'Capacidad'}
                            tagValue={'personas'} />

                        <TextField ref={'motor'}
                            idField={'motor'}
                            tagComponent={'Motor'}
                            placeholder={'Motor...'}
                            isRequired />

                        <NumberField ref={'cilin'}
                            idField={'cilin'}
                            defaultValue={1500}
                            tagComponent={'Cilindrada'}
                            tagValue={'c.c.'} />

                        <div className="row">
                            <div className="col-md-6 ff">
                                <ButtonField
                                    type={'success'}
                                    texto={'Guardar'}
                                    onClick={this.GuardarMarca} />
                            </div>
                            <div className="col-md-6 ff">
                                <ButtonField
                                    type={'danger'}
                                    texto={'Cancelar'} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <TableField />
                    </div>
                </div>
            </div>
        )
    }
}
export default View