/**
 * Created by Williams on 23/2/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

//Seccion que importa los estilos del componente
//import './'

class ContentTable extends Component {

    static propTypes = {
        listaContenido: PropTypes.array,
        identificadorUnico: PropTypes.string,
        forUpdate: PropTypes.bool,
        forDelete: PropTypes.bool,
        onClickItemTable: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            listaContenido: this.props.listaContenido,
            visible: this.props.visible,
            identificadorUnico: this.props.identificadorUnico,
            forUpdate: this.props.forUpdate,
            forDelete: this.props.forDelete,
            onClickItemTable: this.props.onClickItemTable
        }
        // bindeo para funciones y metodos
        this.armarRowTable = this.armarRowTable.bind(this)
        this.clickItemTable = this.clickItemTable.bind(this)
    }

    static defaultProps = {
        visible: true,
        identificadorUnico: '',
        forUpdate: false,
        forDelete: false,
        listaContenido: []
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
        if (nextProps.listaContenido !== null) {
            this.setState({ listaContenido: nextProps.listaContenido })
        }
        if (nextProps.onClickItemTable !== null) {
            this.setState({ onClickItemTable: nextProps.onClickItemTable })
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

    armarRowTable (itemL) {
        // console.log('armarRowTable', itemL, this.state, this.props)
        let arrCont = []
        for(let prop in itemL){
            arrCont.push(prop)
        }
        if (this.state.forUpdate) {
            arrCont.push('UpdaterTable')
        }
        if (this.state.forDelete) {
            arrCont.push('DeleterTable')
        }
        let cont = arrCont.map((itemC, numC) => {
            // console.log('itemCDelArray', itemC)
            if (itemC === 'UpdaterTable') {
                return(
                    <td key={numC}>
                        <div className="btn btn-warning btn-xs"
                             onClick={() => this.clickItemTable(itemL[this.props.identificadorUnico], 'update')} >
                            <img alt="updater"
                                 src={'appImages/pencil.png'}
                                 width="25"
                                 height="25" />
                        </div>
                    </td>
                )
            } else if (itemC === 'DeleterTable') {
                return(
                    <td key={numC}>
                        <div className="btn btn-danger btn-xs"
                             onClick={() => this.clickItemTable(itemL[this.props.identificadorUnico], 'delete')} >
                            <img alt="deleter"
                                src={'appImages/delete.png'}
                                 width="25"
                                 height="25" />
                        </div>
                    </td>
                )
            } else if (itemC === this.props.identificadorUnico) {
                return(
                    null
                )
            } else {
                return(
                    <td key={numC}>{itemL[itemC]}</td>
                )
            }
        })
        return(
            cont
        )
    }

    clickItemTable (val, action) {
        // console.log('clickItemTable', val, action)
        if (this.state.onClickItemTable !== null && this.state.onClickItemTable !== undefined) {
            this.state.onClickItemTable(val, action)
        }
    }

    render () {
        // console.log('renderComponent', this.state.listaContenido)
        return(this.state.listaContenido.map((itemL, idL) => {
            return(
                <tr key={idL} >
                    {this.armarRowTable(itemL)}
                </tr>
            )
            })
        )
    }
}
export default ContentTable