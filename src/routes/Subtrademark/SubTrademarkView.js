/**
 * Created by Williams on 8/3/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import alertify from 'alertifyjs'
//Seccion que carga el archivo que realiza los estilos
import './SubTrademark.scss'

//Seccion para instanciar gestores e importar funciones del controller
import {
    GUARDAR,
    ObtenerListaMarcas,
    ObtenerListaSubMarcas
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
const EntityView = obtenerEntidadForView('SeccionMarcas')

class View extends Component {

    static propTypes = {

    }

    constructor (props) {
        // console.log('constructorView')
        super(props)

        // bindeo para funciones y metodos
        this.validadorCampos = this.validadorCampos.bind(this)
        this.guardarMarca = this.guardarMarca.bind(this)
        this.obtenerMarcas = this.obtenerMarcas.bind(this)
        this.armarListadoMarks = this.armarListadoMarks.bind(this)
        this.vaciarCampos = this.vaciarCampos.bind(this)
    }

    static defaultProps = {

    }

    componentWillMount(){
        //console.log('componentWillMountView')
    }

    componentDidMount(){
        //console.log('componentDidMountView')
        let self = this
        self.obtenerMarcas()
        self.obtenerSubmarcas()
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

    obtenerMarcas () {
        let self = this
        ObtenerListaMarcas().then((pRespMarcasController) => {
            // console.log('pRespMarcasController', pRespMarcasController)
            if (pRespMarcasController.Correcto) {
                let listaMarcas = self.armarListadoMarks(pRespMarcasController.listaResultado)
                    self.refs.listMarks.setState({ optionsList: listaMarcas })
            } else {
                // dar mensaje de fallo
                self.refs.listMarks.setState({ optionsList: [] })
                alertify.error(pRespMarcasController.Mensaje)
            }
        })
    }

    obtenerSubmarcas () {
        let self = this
        ObtenerListaSubMarcas().then(function(pRespSTControl) {
            console.log('pRespSTControl', pRespSTControl)
            if (pRespSTControl.Correcto) {
                self.refs.tablaMarcas.setState({ data: pRespSTControl.listaResultado })
            } else {
                self.refs.tablaMarcas.setState({ data: [] })
                alertify.error(pRespSTControl.Mensaje)
            }
        })
    }

    vaciarCampos (actionButton = false) {
        let self = this
        self.refs.listMarks.setState({ value: '' })
        self.refs.name.setState({ value: '' })
        self.refs.capacity.setState({ value: EntityView.Capacidad.defaultValue })
        self.refs.motor.setState({ value: '' })
        self.refs.cilin.setState({ value: EntityView.Cilindrada.defaultValue })
        if (actionButton) {
            alertify.warning('Se vaciaron los campos')
        }
    }

    guardarMarca () {
        console.log('guardarMarca', this.refs)
        let self = this
        let validador = self.validadorCampos()
        if (validador.correcto) {
            // esta llenado correcto
            let datos = {
                marca: self.refs.listMarks.state.value,
                nombre: self.refs.name.state.value,
                capacidad: self.refs.capacity.state.value,
                motor: self.refs.motor.state.value,
                cilindros: self.refs.cilin.state.value
            }
            alertify.confirm('AUTO TIENDA', 'Guardar Marca?',
                function(){
                    GUARDAR(datos).then(function(pRespSaveController) {
                        if (pRespSaveController.Correcto) {
                            self.vaciarCampos()
                            self.obtenerSubmarcas()
                            alertify.success('El registro fue exitoso')
                        } else {
                            alertify.error(pRespSaveController.Mensaje)
                        }
                    })
                },
                function(){ alertify.error('Cancelo')});
        } else {
            // lanzar alerta
            alertify.warning(validador.mensaje)
        }
    }

    validadorCampos () {
        let self = this
        let refsObligatorios = ['listMarks', 'name', 'capacity', 'motor', 'cilin']
        let objRetorno = {
            correcto: true,
            mensaje: 'llenado correcto'
        }
        for (let i in refsObligatorios) {
            if (self.refs[refsObligatorios[i]].state.value === '' ||
                self.refs[refsObligatorios[i]].state.value === undefined ||
                self.refs[refsObligatorios[i]].state.value === null) {
                objRetorno.correcto = false
                objRetorno.mensaje = 'Debe llenar el campo: ' + self.refs[refsObligatorios[i]].state.tagComponent
                break
            }
        }
        return objRetorno
    }

    armarListadoMarks (data = []) {
        let arrRet = []
        for (let i in data) {
            arrRet.push({ value: '' + data[i].id_trademark, name: data[i].id_trademark, tag: data[i].name_trademark })
        }
        return arrRet
    }

    render () {
        // console.log('renderView', this, EntityView)
        return (
            <div>
                <TitleSectionField texto={EntityView.TituloSeccion}/>

                <div className="row">
                    <div className="col-md-4">
                        <SelectListField ref={'listMarks'}
                            optionsList={EntityView.listaMarcas.optionsList}
                            tagComponent={EntityView.listaMarcas.tagComponent} />

                        <TextField ref={'name'}
                            idField={'name'}
                            tagComponent={EntityView.NombreMarca.tagComponent}
                            placeholder={EntityView.NombreMarca.placeholder}
                            isRequired={EntityView.NombreMarca.isRequired} />

                        <NumberField ref={'capacity'}
                            idField={'capacity'}
                            defaultValue={EntityView.Capacidad.defaultValue}
                            tagComponent={EntityView.Capacidad.tagComponent}
                            tagValue={EntityView.Capacidad.tagValue} />

                        <TextField ref={'motor'}
                            idField={'motor'}
                            tagComponent={EntityView.Motor.tagComponent}
                            placeholder={EntityView.Motor.placeholder}
                            isRequired={EntityView.Motor.isRequired} />

                        <NumberField ref={'cilin'}
                            idField={'cilin'}
                            defaultValue={EntityView.Cilindrada.defaultValue}
                            tagComponent={EntityView.Cilindrada.tagComponent}
                            tagValue={EntityView.Cilindrada.tagValue} />

                        <div className="row">
                            <div className="col-md-6">
                                <ButtonField ref={'btnGuardar'}
                                    type={EntityView.btnGuardar.type}
                                    texto={EntityView.btnGuardar.texto}
                                    onClick={this.guardarMarca} />
                            </div>
                            <div className="col-md-6">
                                <ButtonField ref={'btnCancelar'}
                                    type={EntityView.btnCancelar.type}
                                    texto={EntityView.btnCancelar.texto}
                                    texto={'Cancelar'}
                                    onClick={() => this.vaciarCampos(true)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <TableField ref={'tablaMarcas'}
                            tagComponent={EntityView.tableSubMarcas.tagComponent}
                            head={EntityView.tableSubMarcas.head}
                            data={EntityView.tableSubMarcas.data}
                            identificador={'id_sub_trademark'} />
                    </div>
                </div>
            </div>
        )
    }
}
export default View