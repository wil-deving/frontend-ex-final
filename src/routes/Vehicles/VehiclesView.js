import React, { Component } from 'react'
import PropTypes from 'prop-types'
import alertify from 'alertifyjs'
//Seccion que carga el archivo que realiza los estilos
import './Vehicles.scss'

//Seccion para instanciar gestores e importar funciones del controller
import {
    GUARDAR,
    ObtenerSubMarcas,
    ObtenerDatosVehiculos
} from './VehiclesController.js'

//Seccion para importar componentes
import TitleSectionField from './../../components/TitleSeccionField/TitleSectionField.js'
import SelectListField from './../../components/SelectListField/SelectListField.js'
import TextField from './../../components/TextField/TextField.js'
import NumberField from './../../components/NumberField/NumberField.js'
import ButtonField from './../../components/ButtonField/ButtonField.js'
import TableField from './../../components/TableField/TableField.js'
import FileImgField from './../../components/FileImgFiled/FileImgField.js'

//Seccion para importar la funcion que retorna la entidad del view
import { obtenerEntidadForView } from './../../data/EntitiesView.js'
//constante que treara el objeto entidad para esta vista, para mandar a los props de los componentes
const EntityView = obtenerEntidadForView('SeccionVehiculos')

class View extends Component {

    static propTypes = {

    }

    constructor (props) {
        // console.log('constructorView')
        super(props)

        // bindeo para funciones y metodos
        this.validadorCampos = this.validadorCampos.bind(this)
        this.obtenerListaSubMarcas = this.obtenerListaSubMarcas.bind(this)
        this.armarListadoSubMarks = this.armarListadoSubMarks.bind(this)
        this.guardarVehiculo = this.guardarVehiculo.bind(this)
        this.vaciarCampos = this.vaciarCampos.bind(this)
        this.obtenerVehiculos = this.obtenerVehiculos.bind(this)
    }

    static defaultProps = {

    }

    componentWillMount(){
        //console.log('componentWillMountView')
    }

    componentDidMount(){
        //console.log('componentDidMountView')
        let self = this
        self.obtenerListaSubMarcas()
        self.obtenerVehiculos()
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

    validadorCampos () {
        let self = this
        let refsObligatorios = ['listSubMarks', 'listColors', 'precioU', 'placa', 'anio']
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

    obtenerListaSubMarcas () {
        let self = this
        ObtenerSubMarcas().then((pRespSubMarksController) => {
            if (pRespSubMarksController.Correcto) {
                let listaMarcas = self.armarListadoSubMarks(pRespSubMarksController.listaResultado)
                self.refs.listSubMarks.setState({ optionsList: listaMarcas })
            } else {
                // dar mensaje de fallo
                self.refs.listSubMarks.setState({ optionsList: [] })
                alertify.alert('AUTO TIENDA', pRespSubMarksController.Mensaje, function(){
                    alertify.message('Error en peticion a la base de datos');
                })
            }
        })
    }

    armarListadoSubMarks (data = []) {
        let arrRet = []
        for (let i in data) {
            arrRet.push({ value: '' + data[i].id_sub_trademark, name: data[i].id_sub_trademark, tag: data[i].name_sub_trademark })
        }
        return arrRet
    }

    guardarVehiculo () {
        console.log('guardarMarca', this.refs)


        let self = this
        let validador = self.validadorCampos()
        if (validador.correcto) {
            // esta llenado correcto
            let datos = {
                idSubMarca: self.refs.listSubMarks.state.value,
                color: self.refs.listColors.state.value,
                precioU: parseFloat(self.refs.precioU.state.value),
                placa: self.refs.placa.state.value,
                chasis: self.refs.chasis.state.value,
                anio: parseInt(self.refs.anio.state.value)
            }
            alertify.confirm('AUTO TIENDA', 'Guardar Vehiculo?',
                function(){
                    GUARDAR(datos).then(function(pRespSaveController) {
                        if (pRespSaveController.Correcto) {
                            self.vaciarCampos()
                            self.obtenerVehiculos()
                            alertify.success('El registro fue exitoso')
                        } else {
                            alertify.error(pRespSaveController.Mensaje)
                        }
                    })
                },
                function(){ alertify.error('Cancelo guardar')});
        } else {
            // lanzar alerta
            alertify.warning(validador.mensaje)
        }
    }

    vaciarCampos (actionButton = false) {
        let self = this
        self.refs.listSubMarks.setState({ value: '' })
        self.refs.listColors.setState({ value: '' })
        self.refs.precioU.setState({ value: EntityView.PrecioUnitario.defaultValue })
        self.refs.placa.setState({ value: '' })
        self.refs.chasis.setState({ value: '' })
        self.refs.anio.setState({ value: EntityView.AnioModelo.defaultValue })
        // self.refs.imgVehicle.setState({ value: '' })
        if (actionButton) {
            alertify.warning('Se vaciaron los campos')
        }
    }

    obtenerVehiculos () {
        let self = this
        ObtenerDatosVehiculos().then((pRespVehiclesController) => {
            // console.log('pRespVehiclesController', pRespVehiclesController)
            if (pRespVehiclesController.Correcto) {
                self.refs.tableVehicles.setState({ data: pRespVehiclesController.listaResultado })
            } else {
                self.refs.tableVehicles.setState({ data: [] })
                alertify.error(pRespVehiclesController.Mensaje)
            }
        })
    }

    render () {
        //console.log('renderView', this)
        return (
            <div>
                <TitleSectionField texto={EntityView.TituloSeccion}/>

                <div className="row">
                    <div className="col-md-3">
                        <SelectListField ref={'listSubMarks'}
                            idField={'listSubMarks'}
                            optionsList={EntityView.listaSubMarcas.optionsList}
                            tagComponent={EntityView.listaSubMarcas.tagComponent} />

                        <SelectListField ref={'listColors'}
                            idField={'listColors'}
                            optionsList={EntityView.listaColores.optionsList}
                            tagComponent={EntityView.listaColores.tagComponent} />

                        <NumberField ref={'precioU'}
                            idField={'precioU'}
                            defaultValue={EntityView.PrecioUnitario.defaultValue}
                            tagComponent={EntityView.PrecioUnitario.tagComponent}
                            tagValue={EntityView.PrecioUnitario.tagValue} />

                        <TextField ref={'placa'}
                            idField={'placa'}
                            tagComponent={EntityView.PlacaControl.tagComponent}
                            placeholder={EntityView.PlacaControl.placeholder}
                            isRequired={EntityView.PlacaControl.isRequired} />

                        <TextField ref={'chasis'}
                            idField={'chasis'}
                            tagComponent={EntityView.Chasis.tagComponent}
                            placeholder={EntityView.Chasis.placeholder}
                            isRequired={EntityView.Chasis.isRequired} />

                        <NumberField ref={'anio'}
                            idField={'anio'}
                            defaultValue={EntityView.AnioModelo.defaultValue}
                            tagComponent={EntityView.AnioModelo.tagComponent}
                            tagValue={EntityView.AnioModelo.tagValue} />

                        {/*
                            <FileImgField ref={'imgVehicle'}
                                tagComponent={'Seleccione una imagen de vehiculo'} />
                        */}

                        <div className="row">
                            <div className="col-md-6">
                                <ButtonField ref={'btnGuardarVehi'}
                                    type={EntityView.btnGuardarVehicle.type}
                                    texto={EntityView.btnGuardarVehicle.texto}
                                    onClick={this.guardarVehiculo} />
                            </div>
                            <div className="col-md-6">
                                <ButtonField ref={'btnCancelarVehi'}
                                    type={EntityView.btnCancelarVehicle.type}
                                    texto={EntityView.btnCancelarVehicle.texto}
                                    onClick={() => this.vaciarCampos(true)} />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <TableField ref={'tableVehicles'}
                            tagComponent={EntityView.tableVehiculos.tagComponent}
                            head={EntityView.tableVehiculos.head}
                            data={EntityView.tableVehiculos.data}
                            identificador={'id_vehicle'} />
                    </div>
                </div>
            </div>
        )
    }

}
export default View