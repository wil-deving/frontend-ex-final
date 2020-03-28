/**
 * Created by Williams on 26/3/2020.
 */
import GestorServices from './../../services/GestorServices.js'
import Model from './QuotesModel.js'

var uuid = require('uuid')

export function GUARDAR (val = '') {
    let id = uuid.v4()
    return new Promise((resolve, reject) => {
        resolve({
            mensaje: val
        })
    })
}

export function ObtenerListaCredito (tipo = 'todos') {
    // console.log('ObtenerListaCredito', tipo)
    let gestorServices = new GestorServices()
    let Modelo = new Model()
    let Consulta = Modelo.ObtenerPorCredito(tipo)

    return new Promise((resolve, reject) => {
        gestorServices.ExecuteSimpleQuery(Consulta).then((pRespDBCredito) => {
            // console.log('pRespDBCredito', pRespDBCredito)
            if (pRespDBCredito.correcto) {
                resolve({
                    Correcto: true,
                    Mensaje: pRespDBCredito.mensaje,
                    listaResultado: pRespDBCredito.listaResultado
                })
            } else {
                resolve({
                    Correcto: false,
                    Mensaje: pRespDBCredito.mensaje,
                    listaResultado: []
                })
            }
        })
    })
}
