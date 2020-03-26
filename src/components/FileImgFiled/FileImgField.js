/**
 * Created by Williams on 21/3/2020.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

//Seccion que importa los estilos del componente
import './FileImgField.scss'

class MiComponente extends Component {

    static propTypes = {
        tagComponent: PropTypes.string,
        visible: PropTypes.bool,
        value: PropTypes.string,
        enabled: PropTypes.bool
    }

    constructor(props){
        super(props)
        this.state = {
            tagComponent: this.props.tagComponent,
            visible: this.props.visible,
            value: this.props.value,
            enabled: this.props.enabled
        }
        // bindeo para funciones y metodos
        this.onHandleImg = this.onHandleImg.bind(this)
    }

    static defaultProps = {
        tagComponent: 'Seleccione Imagen',
        visible: true,
        value: '',
        enabled: true
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

    onHandleImg () {
        let valor = document.getElementById('imagen').value
        let split1 = valor.split('\\')
        let file = split1[split1.length - 1]
        // console.log('onHandleImg', valor)
        // console.log('onHandleImg', file)
        this.setState({ value: file })
    }

    render () {
        // console.log('renderComponent')
        return(
            <div hidden={!this.state.visible} className="general-img-file">
                <label htmlFor="imagen" className="tag-comp-imgFile gen-comp-fileImg" >
                    {this.props.tagComponent}
                </label>
                <input className="in-file-img"
                    type="file"
                    id="imagen"
                    name="imagen"
                    accept=".jpg, .jpeg, .png"
                    onChange={this.onHandleImg}
                    disabled={!this.props.enabled} />
            </div>
        )
    }
}
export default MiComponente