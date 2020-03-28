import React, { Component } from 'react'
import PropTypes from 'prop-types'
//Seccion que carga el archivo que realiza los estilos
import './Test.scss'

//Seccion para instanciar gestores e importar funciones del controller
import {
    GUARDAR,
    DataTableTest,
    probarSQLForData,
    probarSQLABM
} from './TestController.js'

//Seccion para importar componentes
import ButtonField from './../../components/ButtonField/ButtonField.js'
import TextField from './../../components/TextField/TextField.js'
import CheckboxField from './../../components/CheckboxField/CheckboxField.js'
import RadioButtonField from './../../components/RadioButtonField/RadioButtonField.js'
import SelectListField from './../../components/SelectListField/SelectListField.js'
import TableField from './../../components/TableField/TableField.js'

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
        this.testSQLForData = this.testSQLForData.bind(this)
        this.testSQLABM = this.testSQLABM.bind(this)
        this.testClickRadio = this.testClickRadio.bind(this)
        this.testValueRadios = this.testValueRadios.bind(this)
        this.testOnClickOptions = this.testOnClickOptions.bind(this)
        this.testValOptions = this.testValOptions.bind(this)
        this.guardarTestTable = this.guardarTestTable.bind(this)
        this.traerDataTestTable = this.traerDataTestTable.bind(this)
        this.testRetornoNietoTable = this.testRetornoNietoTable.bind(this)
        this.validarCamposTable = this.validarCamposTable.bind(this)
    }

    static defaultProps = {

    }

    componentWillMount(){
        //console.log('componentWillMountView')
    }

    componentDidMount(){
        //console.log('componentDidMountView')

        //this.traerDataTestTable()

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

    testSQLForData () {
        console.log('testSQLForData')
        probarSQLForData().then(function(pResp){
            console.log('probarSQLForDataResp', pResp)
        })
    }

    testSQLABM () {
        console.log('testSQLABM')
        probarSQLABM().then(function(pResp){
            console.log('testSQLABMpResp', pResp)
        })
    }

    testClickRadio (id, value) {
        console.log('testClickRadioView', id, value)
    }

    testValueRadios () {
        console.log('testValueRadios', this.refs.MisRadios.state)
    }

    testOnClickOptions (val) {
        console.log('testOnClickOptionsView', val)
    }

    testValOptions () {
        console.log('testValOptions', this.refs.opts.state)
    }

    traerDataTestTable () {
        let self = this
        DataTableTest().then((pRespDATATT) => {
            console.log('traerDataTestTable', pRespDATATT)
            //let lista = self.validarCamposTable(pRespDATATT.listaResultado)
            let lista = pRespDATATT.listaResultado


            self.refs.dataTest.setState({ data: lista })
        })

    }

    validarCamposTable (data = []) {
        let arrReturn = []
        if (data.length > 0) {
            for (let i in data) {
                let objData = data[i]
                objData.identificadorUnico = 'id_test'
            }

        }
        return arrReturn
    }

    guardarTestTable () {
        console.log('guardarTestTable')
        GUARDAR().then((pResp) => {
            console.log('Respuesta guardado', pResp)
        })
    }

    testRetornoNietoTable (val, action) {
        console.log('testRetornoNietoTable', val, action)
    }

    render () {
        //console.log('renderView', this)

        let arr = [
            { tag: 'option One', value: 'op1', name: 'ww' },
            { tag: 'option Two', value: 'op2', name: 'ww' },
            { tag: 'option Three', value: 'op3', name: 'ww' },
            { tag: 'option Four', value: 'op4', name: 'ww' },
            { tag: 'option Five', value: 'op5', name: 'ww' },
            { tag: 'option Six', value: 'op6', name: 'ww' },
            { tag: 'option Seven', value: 'op7', name: 'ww' },
            { tag: 'option Eight', value: 'op8', name: 'ww' },
            { tag: 'option Nine', value: 'op9', name: 'ww' },
            { tag: 'option Ten', value: 'op10', name: 'ww' }
        ]

        let head = ['Columna Dos']


        return (
            <div>

                {/*
                <TableField ref={'dataTest'}
                    head={head}
                    data={[]}
                    identificador={'id_test'}
                    forUpdate={true}
                    forDelete={true}
                    tagComponent="Lista preferida"
                    onClickItem={this.testRetornoNietoTable} />

                <ButtonField
                    texto={'Guardar datos test table'}
                    type={'default'}
                    onClick={this.guardarTestTable} />

                <ButtonField
                    texto={'Guardar datos test table'}
                    type={'success'}
                    onClick={this.guardarTestTable} />

                */}

                <a href={'http://localhost/ShopCar/TestReports/creatorReport.php'} className="btn btn-dark btn-sm">
                    Ir al back <span className="glyphicon glyphicon-file"></span>
                </a>


                <a href="../procesos/ventas/testReport.php" >
                    test report <span className="glyphicon glyphicon-file"></span>
                </a>

            </div>
        )
    }

}
export default View