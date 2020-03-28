import GestorServices from './../../services/GestorServices.js'
import Model from './TestModel.js'

var uuid = require('uuid')

export function GUARDAR (val = '') {

    let id = uuid.v4()

    let consultaInsert = 'INSERT INTO tabletest (id_test, fecha_test, campo_fecha, campo_hora, ' +
        ' campo_entero, campo_decimal, campo_flotante, campo_bool, campo_max_text) ' +
        ' VALUES ( ' + `'` + id + `', ` + 'NOW()' + `, ` + 'NOW()' + `, ` + `'` + '15:00' + `', ` +
        200 + ', ' + 100.1234 + ', ' + 42.5633 + ', ' + 1 + ', ' + `'` + 'WWWWWW' + `'` + ') '

    return new Promise((resolve, reject) => {

        let gestorServices = new GestorServices()

        gestorServices.ExecuteSimpleQuery(consultaInsert, 'insertar')
            .then((pRespInsert) => {
                console.log('pRespInsert', pRespInsert)
                resolve(pRespInsert)
            })
    })
}

export function DataTableTest () {

    let gestorServices = new GestorServices()
    //let consulta = 'select * from tabletest'
    let consulta = 'select * from test'

    return new Promise((resolve, reject) => {

        gestorServices.ExecuteSimpleQuery(consulta)
            .then((pRespDataTT) => {
                resolve(pRespDataTT)
            })

    })


}

export function probarSQLForData () {
    let consulta = 'select * from test'

    let gestorServices = new GestorServices()
    return new Promise((resolve, reject) => {
        gestorServices.ExecuteSimpleQuery(consulta)
            .then(function(pRespAJAX){
                console.log('pRespAJAX', pRespAJAX)
                resolve(pRespAJAX)
            })

    })
}

export function probarSQLABM () {
    let idtest = uuid.v4()

    let consulta = 'INSERT INTO test (id_test, fecha_test) VALUES ' +
        ' ( ' + `'` + idtest + `'` + ', NOW() ) '

    let gestorServices = new GestorServices()

    return new Promise((resolve, reject) => {
        gestorServices.ExecuteSimpleQuery(consulta, 'insertar')
            .then(function(pRespAJAX){
                console.log('pRespAJAX', pRespAJAX)
                resolve(pRespAJAX)
            })

    })
}
