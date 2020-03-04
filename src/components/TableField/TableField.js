/**
 * Created by Williams on 22/2/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ContentTable from './ContentTable.js'

//Seccion que importa los estilos del componente
import './TableField.scss'

class TableField extends Component {

    static propTypes = {
        datos: PropTypes.array,
        visible: PropTypes.bool
    }

    constructor(props){
        super(props)
        this.state = {
            datos: this.props.datos,
            visible: this.props.visible
        }
        // bindeo para funciones y metodos
        this.armarCabecera = this.armarCabecera.bind(this)
        this.armarContenido = this.armarContenido.bind(this)
    }

    static defaultProps = {
        datos: [],
        visible: true
    }

    componentWillMount(){
        //console.log('componentWillMountComponent')
    }

    componentDidMount(){
        //console.log('componentDidMountComponent')
    }

    componentWillReceiveProps(nextProps){
        //console.log('componentWillReceiveProps', nextProps)
        if (nextProps.visible !== null) {
            if (nextProps.visible) {
                this.setState({ visible: true })
            } else {
                this.setState({ visible: false })
            }
        }
        if (nextProps.datos !== null) {
            this.setState({ datos: nextProps.datos })
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        //console.log('shouldComponentUpdateComponent', nextProps, nextState)
        return true
    }

    componentWillUpdate(nextProps, nextState){
        //console.log('componentWillUpdateComponent', nextProps, nextState)
    }

    componentDidUpdate(prevProps, prevState){
        //console.log('componentDidUpdateComponent', prevProps, prevState)
    }

    componentWillUnmount(){
        //console.log('componentWillUnmountComponent')
    }

    armarCabecera () {
        //let arrayTest = [
        //    { id: 1, name: 'Williams', address: 'Llojeta' },
        //    { id: 2, name: 'Cristian', address: 'El Alto' },
        //    { id: 3, name: 'Eduardo', address: 'Lojeta' },
        //    { id: 4, name: 'Dexter', address: 'Cotahuma' }
        //]

        let forHead = this.state.datos[0]
        let arrHead = []
        for(let prop in forHead){
            arrHead.push(prop)
        }
        let head = arrHead.map((itemH, numH) => {
            return(
                <td key={numH} >{itemH}</td>
            )
        })
        return(
            head
        )
    }

    armarContenido () {

        return(
            <ContentTable litaContenido={this.state.datos} />
        )

    }

    render () {
        // console.log('renderComponent')

        return(
            <div>
                <table align="center" cellSpacing="2" cellPadding="2" border="1">
                    <tbody>
                        <tr>
                            {this.armarCabecera()}
                        </tr>
                        {this.armarContenido()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default TableField