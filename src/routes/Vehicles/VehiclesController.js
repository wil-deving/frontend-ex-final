/**
 * Created by Williams on 8/3/2020.
 */
import GestorServices from './../../services/GestorServices.js'
import Model from './VehiclesModel.js'

var uuid = require('uuid')

export function GUARDAR (datos = null) {
    let gestorServices = new GestorServices()
    let Modelo = new Model()
    datos.idVehicle = uuid.v4()
    let insertQuery = Modelo.insertarRegistroVehiculo(datos)

    return new Promise((resolve, reject) => {
        gestorServices.ExecuteSimpleQuery(insertQuery, 'insertar')
            .then((pRespSaveVehicleDB) => {
                // console.log('pRespSaveVehicleDB', pRespSaveVehicleDB)
                if (pRespSaveVehicleDB.correcto) {
                    resolve({
                        Correcto: true,
                        Mensaje: pRespSaveVehicleDB.mensaje,
                        listaResultado: pRespSaveVehicleDB.listaResultado
                    })
                } else {
                    resolve({
                        Correcto: false,
                        Mensaje: pRespSaveVehicleDB.mensaje,
                        listaResultado: []
                    })
                }
            })
    })
}


export function ObtenerSubMarcas () {
    let gestorServices = new GestorServices()
    let Modelo = new Model()
    let consulta = Modelo.obtenerSubMarks()

    return new Promise((resolve, reject) => {
        gestorServices.ExecuteSimpleQuery(consulta).then(function(pRespsubMaeksDB) {
            // console.log('pRespsubMaeksDB', pRespsubMaeksDB)
            if (pRespsubMaeksDB.correcto) {
                resolve({
                    Correcto: true,
                    Mensaje: pRespsubMaeksDB.mensaje,
                    listaResultado: pRespsubMaeksDB.listaResultado
                })
            } else {
                resolve({
                    Correcto: false,
                    Mensaje: pRespsubMaeksDB.mensaje,
                    listaResultado: []
                })
            }
        })
    })
}

export function ObtenerDatosVehiculos () {
    let gestorServices = new GestorServices()
    let Modelo = new Model()
    let consulta = Modelo.obtenerDataVehicles()

    return new Promise((resolve, reject) => {
        gestorServices.ExecuteSimpleQuery(consulta).then((pRespVehiclesDB) => {
            // console.log('pRespVehiclesDB', pRespVehiclesDB)
            if (pRespVehiclesDB.correcto) {
                resolve({
                    Correcto: true,
                    Mensaje: pRespVehiclesDB.mensaje,
                    listaResultado: pRespVehiclesDB.listaResultado
                })
            } else {
                resolve({
                    Correcto: false,
                    Mensaje: pRespVehiclesDB.mensaje,
                    listaResultado: []
                })
            }
        })
    })
}