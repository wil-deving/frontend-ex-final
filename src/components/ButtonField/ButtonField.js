/**
 * Created by Williams on 12/2/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ButtonField extends Component {

    static propTypes = {

    }

    constructor(props){
        super(props)
        this.state = {
            visible: this.props.visible,
            texto: this.props.texto,
            onClick: this.props.onClick
        }
        this.funcionClick = this.funcionClick.bind(this)
    }

    static defaultProps = {
        visible:false,
        texto: 'boton'
    }

    funcionClick () {
        console.log('presiono el boton Funcion en el componente boton')
        if(this.state.onClick !== undefined && this.state.onClick !== null){
            this.state.onClick()
        }
    }

    render(){
        return(
            <div hidden={this.state.visible}>
                <button onClick={this.funcionClick}>
                    {this.state.texto}
                </button>
            </div>
        );
    }

}
export default ButtonField