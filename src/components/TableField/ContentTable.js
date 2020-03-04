/**
 * Created by Williams on 23/2/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

//Seccion que importa los estilos del componente
//import './'

class ContentTable extends Component {

    static propTypes = {
        litaContenido: PropTypes.array,
        visible: PropTypes.bool
    }

    constructor(props) {
        super(props)
        this.state = {
            litaContenido: this.props.litaContenido,
            visible: this.props.visible
        }
        // bindeo para funciones y metodos
        this.armarRowTable = this.armarRowTable.bind(this)
    }

    static defaultProps = {
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
        // console.log('armarRowTable', itemL)
        let arrCont = []
        for(let prop in itemL){
            arrCont.push(prop)
        }
        let cont = arrCont.map((itemC, numC) => {
            return(
                <td key={numC} >{itemL[itemC]}</td>
            )
        })
        return(
            cont
        )

    }

    render () {
        // console.log('renderComponent', this.props.litaContenido)

        return(this.props.litaContenido.map((itemL, idL) => {
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