/**
 * Created by Williams on 12/2/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ButtonField.scss'

class ButtonField extends Component {

    /*TODO estados y propiedades del componente*/
    /*
    * visible-> bool que muestra u oculta el componente
    * texto-> string que muestra el texto que tendra el boton
    * enabled-> bool que habilita o no el componente
    * type-> tipo de boton para los estilos (success, primary, default, warning, danger)
    * onClick-> Funcion que ejecutara en el padre
    * */

    static propTypes = {
        visible: PropTypes.bool,
        texto: PropTypes.string,
        enabled: PropTypes.bool,
        type: PropTypes.string,
        onClick: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            visible: this.props.visible,
            texto: this.props.texto,
            enabled: this.props.enabled,
            type: this.props.type,
            onClick: this.props.onClick
        }
        this.funcionClick = this.funcionClick.bind(this)
    }

    static defaultProps = {
        visible: true,
        texto: 'boton',
        enabled: true,
        type: 'default'
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.visible !== null && nextProps.visible !== undefined) {
            this.setState({ visible: nextProps.visible })
        }
        if (nextProps.enabled !== null && nextProps.enabled !== undefined) {
            this.setState({ enabled: nextProps.enabled })
        }
        if (nextProps.texto !== null && nextProps.texto !== undefined) {
            this.setState({ texto: nextProps.texto })
        }
        if (nextProps.type !== null && nextProps.type !== undefined) {
            this.setState({ type: nextProps.type })
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        //console.log('shouldComponentUpdateComponent', nextProps, nextState)
        return true
    }

    funcionClick () {
        console.log('presiono el boton Funcion en el componente boton')
        if(this.state.onClick !== undefined && this.state.onClick !== null){
            this.state.onClick()
        }
    }

    render(){

        return(
            <div hidden={!this.state.visible} className="general-boton">
                <button id="button" className={this.state.type + ' general-button border'}
                    onClick={this.funcionClick}
                    disabled={!this.state.enabled} >
                    {this.state.texto}
                </button>
            </div>
        )
    }

}
export default ButtonField