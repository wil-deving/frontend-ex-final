/**
 * Created by Williams on 26/3/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import alertify from 'alertifyjs'
//Seccion que carga el archivo que realiza los estilos
import './Quotes.scss'

//Seccion para instanciar gestores e importar funciones del controller
import {
    GUARDAR,
    ObtenerListaCredito
} from './QuotesController.js'

//Seccion para importar componentes
import TitleSectionField from './../../components/TitleSeccionField/TitleSectionField.js'
import RadioButtonField from './../../components/RadioButtonField/RadioButtonField.js'
import TableField from './../../components/TableField/TableField.js'

//Seccion para importar la funcion que retorna la entidad del view
import { obtenerEntidadForView } from './../../data/EntitiesView.js'
//import { ConfigServicesReports } from './../../services/ConfigServices.js'
//constante que treara el objeto entidad para esta vista, para mandar a los props de los componentes
const EntityView = obtenerEntidadForView('SeccionCotizaciones')

class View extends Component {

    static propTypes = {
        typeReport: PropTypes.string
    }

    constructor (props) {
        // console.log('constructorView')
        super(props)
        this.state = {
            typeReport: this.props.typeReport
        }

        // bindeo para funciones y metodos
        this.obtenerListaCredito = this.obtenerListaCredito.bind(this)
        this.onClickTipo = this.onClickTipo.bind(this)
    }

    static defaultProps = {
        typeReport: 'todos'
    }

    componentWillMount(){
        //console.log('componentWillMountView')
    }

    componentDidMount(){
        //console.log('componentDidMountView')
        let self = this
        this.setState({ typeReport: this.refs.tipoQuote.state.value })
        self.obtenerListaCredito()
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

    obtenerListaCredito (tipo = 'todos') {
        // console.log('obtenerListaCredito')
        let self = this
        ObtenerListaCredito(tipo).then((pRespControllerCredito) => {
            // console.log('pRespControllerCredito', pRespControllerCredito)
            if (pRespControllerCredito.Correcto) {
                self.refs.dataQuotes.setState({ data: pRespControllerCredito.listaResultado })
                if (tipo === 'credito') {
                    self.refs.dataQuotes.setState({
                        head: ['Nombre Marca', 'Nombre Modelo', 'A\u00F1o', 'Precio', 'Capital Amortizado',
                            'Tiempo Plazo', 'Cuota mensual']
                    })
                } else {
                    self.refs.dataQuotes.setState({ head: EntityView.TableQuotes.head })
                }
            } else {
                self.refs.dataQuotes.setState({ data: [], head: [] })
                alertify.alert('AUTO TIENDA', pRespControllerCredito.Mensaje, function(){
                    alertify.message('Error en peticion a la base de datos');
                })
            }
        })
    }

    onClickTipo (val) {
        // console.log('onClickTipo', val)
        let self = this
        this.setState({ typeReport: val })
        self.obtenerListaCredito(val)
    }

    render () {
        //console.log('renderView', this)
        let urlReport = /*ConfigServicesReports()*/ +
            'CreatorQuotesReport.php?type=' +
            this.state.typeReport
        // console.log('urlReport', urlReport, this.state)
        return (
            <div>
                <TitleSectionField texto={EntityView.TituloSeccion} />

                <div className="row">
                    <div className="col-md-8">
                        <RadioButtonField ref={'tipoQuote'}
                            tagComponent={EntityView.TipoVenta.tagComponent}
                            radiosList={EntityView.TipoVenta.radiosList}
                            onClickRadio={this.onClickTipo} />
                    </div>
                    <div className="col-md-4">
                        <a href={urlReport} className="btn btn-primary btn-sm">
                            Generar Reporte <span className="glyphicon glyphicon-file"></span>
                        </a>
                    </div>
                </div>

                <TableField ref={'dataQuotes'}
                    tagComponent={EntityView.TableQuotes.tagComponent}
                    head={EntityView.TableQuotes.head}
                    data={[]} />

            </div>
        )
    }

}
export default View