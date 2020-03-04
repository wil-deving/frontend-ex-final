/**
 * Created by Williams on 18/2/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

//Seccion que importa los estilos del componente
//import './'

class MiComponente extends Component {

    static propTypes = {
        visible: PropTypes.bool
    }

    constructor(props){
        super(props)
        this.state = {
            visible: this.props.visible
        }
        // bindeo para funciones y metodos
        this.onChangeField = this.onChangeField.bind(this)
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

    onChangeField () {
        // console.log('onChangeField', this.props.idField)
        let valor = document.getElementById(this.props.idField).value
        // console.log('CambioTextField', valor)
        this.setState({ valueField: valor })


    }

    render () {
        return (
            <div>
                <input id={this.props.idField}
                    type="text"
                    onChange={this.onChangeField}
                    placeholder={this.props.placeholder} />

            </div>
        )
    }
}
export default MiComponente