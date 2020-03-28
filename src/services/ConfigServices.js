/**
 * Created by Williams on 17/2/2020.
 */
//Variable debe ser tru si llama al backend publico o false si llama al backend local
const PUBLICA = true

var protocol = 'http'
var host = '192.168.0.105'
const port = '80'
const nameBackSQL = 'ShopCar'
const nameServiceSQlForData = 'ForDataQuery'
const nameServiceSQlABM = 'ABMQuery'
const nameServiceReport = 'Reports/LinksReports'

// Config aplicacion en la nube
const protocolCloud = 'https'
const hostCloud = 'examenfinalwil.000webhostapp.com'

export function ConfigServicesSQl (typeQuery = 'select') {
    let nameServiceSQl = nameServiceSQlForData
    if (typeQuery === 'insertar' || typeQuery === 'modificar' || typeQuery === 'eliminar') {
        nameServiceSQl = nameServiceSQlABM
    }
    let nameService = nameBackSQL + '/' + nameServiceSQl + '/'
    let URLConexion = protocol + '://' + host + ':' + port + '/' + nameService
    if (PUBLICA) {
        protocol = protocolCloud
        host = hostCloud
        nameService = nameServiceSQl + '/'
        URLConexion = protocol + '://' + host + '/' + nameService
    }
    return {
        URL: URLConexion,
        timer: 60000
    }

}

export function ConfigServicesReports () {
    if (PUBLICA) {
        protocol = protocolCloud
        host = hostCloud
    }
    let URLReturn = (PUBLICA)
        ? protocol + '://' + host + '/' + nameServiceReport + '/'
        : protocol + '://' + host + ':' + port + '/' + nameBackSQL + '/' + nameServiceReport + '/'
    return URLReturn
}