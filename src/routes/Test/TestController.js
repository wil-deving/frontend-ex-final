import GestorServices from './../../services/GestorServices.js'
import Model from './TestModel.js'

var uuid = require('uuid')

export function GUARDAR (val = '') {

    let id = uuid.v4()

    return new Promise((resolve, reject) => {
        resolve({
            mensaje: val
        })
    })
}
