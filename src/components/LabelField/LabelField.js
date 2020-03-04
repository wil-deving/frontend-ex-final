/**
 * Created by BWil on 13/04/2019.
 */
import React, { Component } from 'react'

class LabelField extends Component {


    constructor(props){
        super(props)
        this.state = {
            visible: this.props.visible,
            texto: this.props.texto
        }
        //bind de las funciones
    }

    static defaultProps = {
        visible: true,
        texto: 'Defecto'
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.texto !== null){
            this.setState({ texto: nextProps.texto })
        }
    }

    render(){
        return(
            <div hidden={!this.state.visible}>
                <label>{this.state.texto}</label>
            </div>
        );
    }



}
export default LabelField