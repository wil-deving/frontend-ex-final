/**
 * Created by Williams on 8/3/2020.
 */
import GestorServices from './../../services/GestorServices.js'
import Model from './SubTrademarkModel.js'

var uuid = require('uuid')

export function GUARDAR (data = null) {
    // console.log('GUARDARCONTROLLER', data)
    let gestorServices = new GestorServices()
    let Modelo = new Model()
    data.idSubMark = uuid.v4()
    let insertQuery = Modelo.insertarRegistroMarca(data)

    return new Promise((resolve, reject) => {
        gestorServices.ExecuteSimpleQuery(insertQuery, 'insertar').then((pRespDBSave) => {
            if (pRespDBSave.correcto) {
                resolve({
                    Correcto: true,
                    Mensaje: pRespDBSave.mensaje,
                    listaResultado: pRespDBSave.listaResultado
                })
            } else {
                resolve({
                    Correcto: false,
                    Mensaje: pRespDBSave.mensaje,
                    listaResultado: []
                })
            }
        })
    })
}

export function ObtenerListaMarcas () {
    let gestorServices = new GestorServices()
    let Modelo = new Model()
    let consulta = Modelo.obtenerListaMarcas()

    return new Promise((resolve, reject) => {
        gestorServices.ExecuteSimpleQuery(consulta)
            .then((pRespMarcas) => {
                if (pRespMarcas.correcto) {
                    resolve({
                        Correcto: true,
                        Mensaje: pRespMarcas.mensaje,
                        listaResultado: pRespMarcas.listaResultado
                    })
                } else {
                    resolve({
                        Correcto: false,
                        Mensaje: pRespMarcas.mensaje,
                        listaResultado: []
                    })
                }
            })
    })
}

export  function ObtenerListaSubMarcas () {
    let gestorServices = new GestorServices()
    let Modelo = new Model()
    let consulta = Modelo.obtenerListaSubMarcas()

    return new Promise((resolve, reject) => {
        gestorServices.ExecuteSimpleQuery(consulta).then((pRespSTDB) => {
            if (pRespSTDB.correcto) {
                resolve({
                    Correcto: true,
                    Mensaje: pRespSTDB.mensaje,
                    listaResultado: pRespSTDB.listaResultado
                })
            } else {
                resolve({
                    Correcto: false,
                    Mensaje: pRespSTDB.mensaje,
                    listaResultado: []
                })
            }
        })
    })
}