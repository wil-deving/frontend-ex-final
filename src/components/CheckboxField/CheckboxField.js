/**
 * Created by BWil on 13/04/2019.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

//Seccion que importa los estilos del componente
import './CheckboxField.scss'

class CheckboxField extends Component {

    /*TODO estados y propiedades del componente*/
    /*
     * visible-> bool que muestra u oculta el componente
     * tagComponent-> string que muestra el texto general que sobre el campo (label)
     * enabled-> bool que habilita o no el componente
     * value-> array de los items que seleccionara el user
     * checksList-> array con el siguiente formatao
     * todo [ { tag: 'check 1', value: 'id1' }, { tag: 'check 2', value: 'id2', activo: true }]
     * onClickCheck-> funcion que retorna al padre el valor seleccionado
     * */

    static propTypes = {
        visible: PropTypes.bool,
        enabled: PropTypes.bool,
        tagComponent: PropTypes.string,
        value: PropTypes.array,
        checksList: PropTypes.array,
        onClickCheck: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            visible: this.props.visible,
            enabled: this.props.enabled,
            tagComponent: this.props.tagComponent,
            value: this.props.value,
            checksList: this.props.checksList,
            onClickCheck: this.props.onClickCheck
        }
        // bindeo para funciones y metodos
        this.armarChecks = this.armarChecks.bind(this)
        this.validateClick = this.validateClick.bind(this)
        this.setingValue = this.setingValue.bind(this)
    }

    static defaultProps = {
        visible: true,
        enabled: true,
        tagComponent: 'Lista Checks',
        value: [],
        checksList: []
    }

    componentWillMount(){
        console.log('componentWillMountComponentCheckBox', this.props.checksList)
        let arr = []
        for (let i in this.props.checksList) {
            if (this.props.checksList[i].activo !== undefined && this.props.checksList[i].activo !== null) {
                arr.push(this.props.checksList[i].value)
            }
        }
        this.setState({ value: arr })
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
        if (nextProps.checksList !== null && nextProps.checksList !== undefined) {
            this.setState({ checksList: nextProps.checksList })
        }
        if (nextProps.onClickCheck !== undefined && nextProps.onClickCheck !== null) {
            this.setState({ onClickCheck: nextProps.onClickCheck })
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

    armarChecks () {
        // console.log('armarChecks', this.props.checksList)
        let checks = this.props.checksList.map((itemCh, numCh) => {
            let active = false
            if (itemCh.activo !== undefined && itemCh.activo !== null) {
                active = true
            }
            return(
                <div key={numCh} className="item-lbl-check">
                    <label htmlFor={numCh} className={'tag-item'}>
                        {itemCh.tag}
                    </label>
                    <input id={numCh}
                        disabled={!this.state.enabled}
                        type="checkbox"
                        name={itemCh.value}
                        value={itemCh.value}
                        defaultChecked={active}
                        onClick={() => this.validateClick(itemCh.value)} />
                </div>
            )
        })
        return checks
    }

    validateClick (val) {
        console.log('onClickCheck', val)
        this.setingValue(val)
        if (this.state.onClickCheck !== undefined && this.state.onClickCheck !== null) {
            this.state.onClickCheck(val)
        }
    }

    setingValue (val) {
        // console.log('setingValue', val, this.state.value)
        let valor = this.state.value
        let duplicate = false
        if (valor.length > 0) {
            for (let j in valor) {
                if (valor[j] === val) {
                    duplicate = true
                }
            }
            if (!duplicate) {
                valor.push(val)
            } else {
                let i = valor.indexOf(val)
                // console.log('indice repetido para quitar del array', i)
                if (i !== -1) {
                    valor.splice(i, 1)
                }
            }
        } else {
            valor.push(val)
        }
        this.setState({ value: valor })
    }

    render () {
        console.log('renderComponentCheckBox', this.props.checksList)
        if (this.props.checksList.length > 0) {
            return(
                <div className="general-checks" hidden={!this.state.visible}>
                    <div>
                        <span className="general-tag general-check-comp">{this.props.tagComponent}</span>
                    </div>
                    {this.armarChecks()}
                </div>
            )
        } else {
            return(
                <div className="general-checks">
                    <span className="general-tag">{'Sin checks'}</span>
                </div>
            )
        }


    }
}
export default CheckboxField