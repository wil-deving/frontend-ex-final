/**
 * Created by Williams on 21/2/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

//Seccion que importa los estilos del componente
import './SelectListField.scss'

class SelectListField extends Component {

    /*TODO estados y propiedades del componente*/
    /*
    * visible-> bool que muestra u oculta el componente
    * tagComponent-> string que muestra el texto etiqueta del componente (lista de utiles)
    * enabled-> bool que habilita o no el componente
    * value-> valor que seleccionara el user
    * onClick-> Funcion que ejecutara en el padre
    * optionsList-> listado que construira dinamicamente debe tener el siguiente formato
    * [
        { value: 'idUno', name: 'idUno', tag: 'Opcion Uno' }
      ]
    * onClickOption-> funcion que mandara al padre el valor seleccionado por el usuario
    * */

    static propTypes = {
        visible: PropTypes.bool,
        enabled: PropTypes.bool,
        tagComponent: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        defaultSelected: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        optionsList: PropTypes.array,
        onClickOption: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            visible: this.props.visible,
            enabled: this.props.enabled,
            tagComponent: this.props.tagComponent,
            value: this.props.value,
            defaultSelected: this.props.defaultSelected,
            optionsList: this.props.optionsList,
            onClickOption: this.props.onClickOption
        }
        // bindeo para funciones y metodos
        this.armarOptions = this.armarOptions.bind(this)
        this.onSelectedOption = this.onSelectedOption.bind(this)
    }

    static defaultProps = {
        visible: true,
        enabled: true,
        tagComponent: 'Lista Options',
        value: '',
        defaultSelected: '',
        optionsList: []
    }

    componentWillMount(){
        //console.log('componentWillMountComponent')
        if (this.state.defaultSelected !== null && this.state.defaultSelected !== undefined &&
            this.state.defaultSelected !== '') {
            this.setState({ value: this.state.defaultSelected })
        }
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
        if (nextProps.optionsList !== null && nextProps.optionsList !== undefined) {
            this.setState({ optionsList: nextProps.optionsList })
        }
        if (nextProps.onClickOption !== undefined && nextProps.onClickOption !== null) {
            this.setState({ onClickOption: nextProps.onClickOption })
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

    armarOptions () {
        // console.log('armarOptions', this.state.optionsList)
        let defaultOptions = [ { tag: 'Seleccionar...', value: '', name: '' } ]
        let forMapArr = defaultOptions.concat(this.state.optionsList)

        let options = forMapArr.map((itemOp, numOp) => {
            let enabled = true
            let ddd = false
            if (itemOp.value === '2') {
                //enabled = false
            }
            if (itemOp.disabled !== undefined && itemOp.disabled !== null) {
                //enabled = false
            }

            return(
                <option key={numOp}
                    ref={numOp}
                    value={itemOp.value}
                    name={itemOp.name}
                    disabled={!enabled} >
                    {itemOp.tag}
                </option>
            )
        })
        return options
    }

    onSelectedOption() {
        var selectBox = document.getElementById("selectBox")
        var selectedValue = selectBox.options[selectBox.selectedIndex].value
        // console.log('onSelectedOption', selectedValue)
        if (this.state.onClickOption !== undefined && this.state.onClickOption !== null) {
            this.state.onClickOption(selectedValue)
        }
        this.setState({ value: selectedValue })
    }

    render () {
        // console.log('renderComponent')
        return(
            <div hidden={!this.state.visible} className="general-select">
                <div className="cont-tag-comp comp-select-def">
                    <label className="lbl-tag-comp-select">{this.props.tagComponent}</label>
                </div>
                <div className="cont-select-ops">
                    <select id="selectBox" className="select-comp comp-select-def"
                        value={this.state.value}
                        onChange={this.onSelectedOption}
                        disabled={!this.state.enabled} >
                        {this.armarOptions()}
                    </select>
                </div>
            </div>
        )
    }
}
export default SelectListField