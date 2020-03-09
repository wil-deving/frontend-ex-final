/**
 * Created by Williams on 9/3/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

//Seccion que importa los estilos del componente
import './NumberField.scss'

class MiComponente extends Component {

    /*TODO estados y propiedades del componente*/
    /*
     * visible-> bool que muestra u oculta el componente
     * tagComponent-> string que muestra el texto que sobre el campo (label)
     * enabled-> bool que habilita o no el componente
     * value-> valor que pondra en user
     * defaultValue-> valor numerico con el cual iniciara el componente
     * tagValue->string que dira que queremos cuantificar (c.c., autos ,personas, etc)
     * */

    static propTypes = {
        tagComponent: PropTypes.string,
        visible: PropTypes.bool,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        enabled: PropTypes.bool,
        defaultValue: PropTypes.number,
        tagValue: PropTypes.string
    }

    constructor(props){
        super(props)
        this.state = {
            tagComponent: this.props.tagComponent,
            visible: this.props.visible,
            value: this.props.defaultValue,
            enabled: this.props.enabled,
            defaultValue: this.props.defaultValue,
            tagValue: this.props.tagValue
        }
        // bindeo para funciones y metodos
        this.onChangeField = this.onChangeField.bind(this)
    }

    static defaultProps = {
        tagComponent: '',
        visible: true,
        value: '',
        enabled: true,
        defaultValue: 1,
        tagValue: ''
    }

    componentWillMount(){
        // console.log('componentWillMountComponentNumberFiled', this)
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
        // console.log('onChangeField', this.props)
        let valor = document.getElementById(this.props.idField).value
        console.log('CambioNumberField', valor)
        this.setState({ value: valor })
    }

    render () {
        // console.log('renderComponentNumberField', this)
        return(
            <div hidden={!this.state.visible} className="general-number" >
                {
                    (this.props.tagComponent !== '')
                        ?
                        <label htmlFor={this.props.idField} className={'general-comp-num general-label-num'}>
                            {this.props.tagComponent}
                        </label>
                        : null
                }

                <input className={' general-comp-num general-number-field border-num'}
                    id={this.props.idField}
                    type="number"
                    defaultValue={this.props.defaultValue}
                    placeholder={this.props.placeholder}
                    disabled={!this.state.enabled}
                    onChange={this.onChangeField} />
                <span id="t-val">{this.props.tagValue}</span>


            </div>
        )
    }
}
export default MiComponente